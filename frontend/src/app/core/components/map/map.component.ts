import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MapService } from '../../../services/map/map.service';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { CarDotComponent } from './car-dot/car-dot.component';

@Component({
  selector: 'app-map',
  imports: [CommonModule, CarDotComponent],
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  private websocketService = inject(WebSocketService);
  private mapService = inject(MapService);
  private SPACE = 1000;
  private ROTATION_FIX = 90;

  bounds$: WritableSignal<(null | number)[]> = signal([null, null, null, null]);
  data$: WritableSignal<any> = signal({});
  stroke$: WritableSignal<number> = signal(0);
  loading$: WritableSignal<boolean> = signal(true);

  async ngOnInit(): Promise<void> {
    this.mapService
      .fetchMap(
        this.websocketService.liveState$().SessionInfo.Meeting.Circuit.Key
      )
      .subscribe((map) => {
        this.loading$.set(false);
        console.log('map', map);

        if (Object.entries(map).length > 0) {
          const px = (Math.max(...map.x) - Math.min(...map.x)) / 2;
          const py = (Math.max(...map.y) - Math.min(...map.y)) / 2;

          map.transformedPoints = map.x.map((x: number, i: number) =>
            this.rotate(x, map.y[i], map.rotation, px, py)
          );

          const cMinX =
            Math.min(...map.transformedPoints.map(([x]: number[]) => x)) -
            this.SPACE;
          const cMinY =
            Math.min(...map.transformedPoints.map(([, y]: number[]) => y)) -
            this.SPACE;
          const cWidthX =
            Math.max(...map.transformedPoints.map(([x]: number[]) => x)) -
            cMinX +
            this.SPACE * 2;
          const cWidthY =
            Math.max(...map.transformedPoints.map(([, y]: number[]) => y)) -
            cMinY +
            this.SPACE * 2;

          this.bounds$.set([cMinX, cMinY, cWidthX, cWidthY]);

          const cStroke = (cWidthX + cWidthY) / 225;
          this.stroke$.set(cStroke);

          map.corners = map.corners.map((corner: any) => {
            const transformedCorner = this.rotate(
              corner.trackPosition.x,
              corner.trackPosition.y,
              map.rotation,
              px,
              py
            );

            const transformedLabel = this.rotate(
              corner.trackPosition.x +
                4 * cStroke * Math.cos(this.rad(corner.angle)),
              corner.trackPosition.y +
                4 * cStroke * Math.sin(this.rad(corner.angle)),
              map.rotation,
              px,
              py
            );

            return { ...corner, transformedCorner, transformedLabel };
          });

          map.startAngle = this.deg(
            Math.atan(
              (map.transformedPoints[3][1] - map.transformedPoints[0][1]) /
                (map.transformedPoints[3][0] - map.transformedPoints[0][0])
            )
          );

          this.data$.set(map);
        }
      });
  }

  getTrackStatusColour() {
    switch (this.websocketService.liveState$().TrackStatus.Status) {
      case '2':
      case '4':
      case '6':
      case '7':
        return 'stroke-warning/20';
      case '5':
        return 'stroke-error/20';
      default:
        return 'stroke-base-content/20';
    }
  }

  private rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  private deg(rad: number) {
    return rad / (Math.PI / 180);
  }

  private rotate(x: number, y: number, a: number, px: number, py: number) {
    const c = Math.cos(this.rad(a));
    const s = Math.sin(this.rad(a));

    x -= px;
    y -= py;

    const newX = x * c - y * s;
    const newY = y * c + x * s;

    return [newX + px, (newY + py) * -1];
  }

  private sortPosition(a: any, b: any) {
    const [, aLine] = a;
    const [, bLine] = b;
    const aPos = Number(aLine.Position);
    const bPos = Number(bLine.Position);

    return aPos - bPos;
  }

  get lines() {
    return this.websocketService.liveState$().TimingData.Lines;
  }

  get transformedPoints() {
    return this.data$()
      .transformedPoints.map(([x, y]: number[]) => `L${x},${y}`)
      .join(' ');
  }

  get transformStyle() {
    return {
      transform: `translate(${this.stroke$() * -2} ${
        (this.stroke$() * -1) / 2
      }) rotate(${this.data$().startAngle + 90}, ${
        this.data$().transformedPoints[0][0] + this.stroke$() * 2
      }, ${this.data$().transformedPoints[0][1] + this.stroke$() / 2})`,
    };
  }

  get entries() {
    return Object.entries(
      this.websocketService.liveState$().Position.Position[
        this.websocketService.liveState$().Position.Position.length - 1
      ].Entries ?? {}
    ).sort(this.sortPosition);
  }
}
