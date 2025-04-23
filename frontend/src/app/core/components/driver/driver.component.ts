import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Driver } from '../../models/driver.model';
import { TimingLine } from '../../models/timing-data.model';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';

@Component({
  selector: 'app-driver',
  imports: [CommonModule],
  templateUrl: './driver.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverComponent {
  private websocketService = inject(WebSocketService);

  drsEnabledValues: number[] = [10, 12, 14];

  @Input()
  racingNumber!: string;
  @Input()
  line!: TimingLine;

  parsePosChangeColour(pos: string, gridPos: string) {
    if (Number(pos) < Number(gridPos)) return 'text-success';
    if (Number(pos) > Number(gridPos)) return 'text-error';

    return 'text-base-content';
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

  get currentStint() {
    return Object.values(this.timingAppData.Stints)[
      Object.values(this.timingAppData.Stints).length - 1
    ];
  }
}
