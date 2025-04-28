import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { utc } from 'moment';

import { MapService } from '../../../services/map/map.service';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import {
  Corner,
  Map,
  MapSector,
  RenderedSector,
  TrackPosition,
  MapCorner,
} from '../../models/map.model';
import { Message } from '../../models/race-control.model';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  private websocketService = inject(WebSocketService);
  private mapService = inject(MapService);
  private SPACE = 1000;
  private ROTATION_FIX = 90;

  // const [[minX, minY, widthX, widthY], setBounds] = useState<(null | number)[]>([null, null, null, null]);
  // const [[centerX, centerY], setCenter] = useState<(null | number)[]>([null, null]);

  bounds$: WritableSignal<(null | number)[]> = signal([null, null, null, null]);
  centers$: WritableSignal<(null | number)[]> = signal([null, null]);
  points$: WritableSignal<null | { x: number; y: number }[]> = signal(null);
  sectors$: WritableSignal<MapSector[]> = signal([]);
  corners$: WritableSignal<MapCorner[]> = signal([]);
  rotation$: WritableSignal<number> = signal(0);

  async ngOnInit(): Promise<void> {
    this.mapService.fetchMap(
      this.websocketService.liveState$().SessionInfo.Meeting.Circuit.Key
    );

    const centerX =
      (Math.max(...this.mapService.map$().x) -
        Math.min(...this.mapService.map$().x)) /
      2;
    const centerY =
      (Math.max(...this.mapService.map$().y) -
        Math.min(...this.mapService.map$().y)) /
      2;

    const fixedRotation = this.mapService.map$().rotation + this.ROTATION_FIX;

    const sectors = this.createSectors(this.mapService.map$()).map((s) => ({
      ...s,
      start: this.rotate(s.start.x, s.start.y, fixedRotation, centerX, centerY),
      end: this.rotate(s.end.x, s.end.y, fixedRotation, centerX, centerY),
      points: s.points.map((p) =>
        this.rotate(p.x, p.y, fixedRotation, centerX, centerY)
      ),
    }));

    const cornerPositions: MapCorner[] = this.mapService
      .map$()
      .corners.map((corner) => ({
        number: corner.number,
        pos: this.rotate(
          corner.trackPosition.x,
          corner.trackPosition.y,
          fixedRotation,
          centerX,
          centerY
        ),
        labelPos: this.rotate(
          corner.trackPosition.x + 540 * Math.cos(this.rad(corner.angle)),
          corner.trackPosition.y + 540 * Math.sin(this.rad(corner.angle)),
          fixedRotation,
          centerX,
          centerY
        ),
      }));

    const rotatedPoints = this.mapService
      .map$()
      .x.map((x, index) =>
        this.rotate(
          x,
          this.mapService.map$().y[index],
          fixedRotation,
          centerX,
          centerY
        )
      );

    const pointsX = rotatedPoints.map((item) => item.x);
    const pointsY = rotatedPoints.map((item) => item.y);

    const cMinX = Math.min(...pointsX) - this.SPACE;
    const cMinY = Math.min(...pointsY) - this.SPACE;
    const cWidthX = Math.max(...pointsX) - cMinX + this.SPACE * 2;
    const cWidthY = Math.max(...pointsY) - cMinY + this.SPACE * 2;

    this.centers$.set([centerX, centerY]);
    this.bounds$.set([cMinX, cMinY, cWidthX, cWidthY]);
    this.sectors$.set(sectors);
    this.points$.set(rotatedPoints);
    this.rotation$.set(fixedRotation);
    this.corners$.set(cornerPositions);
  }

  getSectorColor(
    sector: MapSector,
    bySector: boolean | undefined,
    trackColor: string | undefined = 'stroke-white',
    yellowSectors: Set<number>
  ) {
    return bySector
      ? yellowSectors.has(sector.number)
        ? trackColor
        : 'stroke-white'
      : trackColor;
  }

  findYellowSectors(messages: Message[] | undefined): Set<number> {
    const msgs = messages?.sort(this.sortUtc).filter((msg) => {
      return (
        msg.Flag === 'YELLOW' ||
        msg.Flag === 'DOUBLE YELLOW' ||
        msg.Flag === 'CLEAR'
      );
    });

    if (!msgs) {
      return new Set();
    }

    const done: Set<number> = new Set();
    const sectors: Set<number> = new Set();
    for (let i = 0; i < msgs.length; i++) {
      const msg = msgs[i];
      if (msg.Scope === 'Track' && msg.Flag !== 'CLEAR') {
        // Spam with sectors so all sectors are yellow no matter what
        // number of sectors there really are
        for (let j = 0; j < 100; j++) {
          sectors.add(j);
        }
        return sectors;
      }
      if (msg.Scope === 'Sector') {
        if (!msg.Sector || done.has(msg.Sector)) {
          continue;
        }
        if (msg.Flag === 'CLEAR') {
          done.add(msg.Sector);
        } else {
          sectors.add(msg.Sector);
        }
      }
    }
    return sectors;
  }

	renderedSectors() {
		const status = this.getTrackStatusMessage(this.trackStatus?.status ? parseInt(trackStatus.status) : undefined);

		return sectors
			.map((sector) => {
				const color = getSectorColor(sector, status?.bySector, status?.trackColor, yellowSectors);
				return {
					color,
					pulse: status?.pulse,
					number: sector.number,
					strokeWidth: color === "stroke-white" ? 60 : 120,
					d: `M${sector.points[0].x},${sector.points[0].y} ${sector.points.map((point) => `L${point.x},${point.y}`).join(" ")}`,
				};
			})
			.sort(prioritizeColoredSectors);
	};

  private rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  private rotate(x: number, y: number, a: number, px: number, py: number) {
    const c = Math.cos(this.rad(a));
    const s = Math.sin(this.rad(a));

    x -= px;
    y -= py;

    const newX = x * c - y * s;
    const newY = y * c + x * s;

    return { y: newX + px, x: newY + py };
  }

  private calculateDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  private findMinDistance(point: TrackPosition, points: TrackPosition[]) {
    let min = Infinity;
    let minIndex = -1;
    for (let i = 0; i < points.length; i++) {
      const distance = this.calculateDistance(
        point.x,
        point.y,
        points[i].x,
        points[i].y
      );
      if (distance < min) {
        min = distance;
        minIndex = i;
      }
    }

    return minIndex;
  }

  private createSectors(map: Map): MapSector[] {
    const sectors: MapSector[] = [];
    const points: TrackPosition[] = map.x.map((x, index) => ({
      x,
      y: map.y[index],
    }));

    for (let i = 0; i < map.marshalSectors.length; i++) {
      sectors.push({
        number: i + 1,
        start: map.marshalSectors[i].trackPosition,
        end: map.marshalSectors[i + 1]
          ? map.marshalSectors[i + 1].trackPosition
          : map.marshalSectors[0].trackPosition,
        points: [],
      });
    }

    const dividers: number[] = sectors.map((s) =>
      this.findMinDistance(s.start, points)
    );
    for (let i = 0; i < dividers.length; i++) {
      let start = dividers[i];
      let end = dividers[i + 1] ? dividers[i + 1] : dividers[0];
      if (start < end) {
        sectors[i].points = points.slice(start, end + 1);
      } else {
        sectors[i].points = points
          .slice(start)
          .concat(points.slice(0, end + 1));
      }
    }

    return sectors;
  }

  private prioritizeColoredSectors(a: RenderedSector, b: RenderedSector) {
    if (a.color === 'stroke-white' && b.color !== 'stroke-white') {
      return -1;
    }
    if (a.color !== 'stroke-white' && b.color === 'stroke-white') {
      return 1;
    }
    return a.number - b.number;
  }

  private sortUtc(a: { Utc: string }, b: { Utc: string }) {
    return utc(b.Utc).diff(utc(a.Utc));
  }

  get parsedPoints() {
    return this.points$()
      ?.map((point) => `L${point.x},${point.y}`)
      .join(' ');
  }
}
