import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  OnInit,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Sector,
  SectorSegment,
  TimingLine,
} from '../../models/timing-data.model';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { DriverTagComponent } from './driver-tag/driver-tag.component';
import { DriverDrsComponent } from './driver-drs/driver-drs.component';
import { DriverRpmComponent } from './driver-rpm/driver-rpm.component';
import { DriverTireComponent } from './driver-tire/driver-tire.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-driver',
  imports: [
    CommonModule,
    DriverTagComponent,
    DriverDrsComponent,
    DriverRpmComponent,
    DriverTireComponent,
  ],
  templateUrl: './driver.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverComponent implements OnInit {
  private breakpointObserver$ = inject(BreakpointObserver);
  private injector = inject(Injector);
  private websocketService = inject(WebSocketService);

  drsEnabledValues: number[] = [10, 12, 14];
  isMobile$!: Signal<boolean>;

  @Input()
  racingNumber!: string;
  @Input()
  line!: TimingLine;

  ngOnInit(): void {
    this.isMobile$ = toSignal(
      this.breakpointObserver$
        .observe(Breakpoints.Handset)
        .pipe(map((result) => result.matches)),
      { initialValue: true, injector: this.injector }
    );
  }

  parseTyreColour(compound: string) {
    switch (compound?.toLowerCase()) {
      case 'soft':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'hard':
        return 'text-base-content';
      case 'intermediate':
        return 'text-success';
      case 'wet':
        return 'text-info';
      default:
        return 'text-base-content';
    }
  }

  parseSectorSegment(sector: Sector): SectorSegment[] {
    return Array.isArray(sector.Segments)
      ? sector.Segments
      : Object.values(sector.Segments ?? {});
  }

  parseSegmentColour(status: number) {
    switch (status) {
      case 2048:
        return 'bg-warning';
      case 2049:
        return 'bg-success';
      case 2051:
        return 'bg-accent';
      case 2064:
        return 'bg-info';
      default:
        return 'bg-base-content/50';
    }
  }

  hasDRS(drs: number) {
    return drs > 9;
  }

  possibleDRS(drs: number) {
    return drs === 8;
  }

  get driver() {
    return this.websocketService.liveState$().DriverList[this.racingNumber];
  }

  get timingStats() {
    return this.websocketService.liveState$().TimingStats.Lines[
      this.racingNumber
    ];
  }

  get timingAppData() {
    return this.websocketService.liveState$().TimingAppData.Lines[
      this.racingNumber
    ];
  }

  get timmingData() {
    return this.websocketService.liveState$().TimingData.Lines[
      this.racingNumber
    ];
  }

  get checkGridPos() {
    return Number.isNaN(this.timingAppData.GridPos);
  }

  get carData() {
    return this.websocketService.liveState$().CarData.Entries[
      this.websocketService.liveState$().CarData.Entries.length - 1
    ].Cars[this.racingNumber].Channels;
  }

  get throttlePercent() {
    return Math.min(100, this.carData['4']);
  }

  get brakePercent() {
    return Math.min(100, this.carData['5']);
  }

  get lineStats(): any[] {
    return Object.values(this.line.Stats ?? ({} as any));
  }

  get stints() {
    return Object.values(this.timingAppData.Stints);
  }

  get currentStint() {
    return Object.values(this.timingAppData.Stints)[
      Object.values(this.timingAppData.Stints).length - 1
    ];
  }

  get sectors(): Sector[] {
    return Array.isArray(this.line.Sectors)
      ? this.line.Sectors
      : Object.values(this.line.Sectors ?? {});
  }
}
