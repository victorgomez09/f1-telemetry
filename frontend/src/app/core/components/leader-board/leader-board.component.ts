import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { TimingLine } from '../../models/timing-data.model';
import { DriverComponent } from '../driver/driver.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leader-board',
  imports: [CommonModule, DriverComponent],
  templateUrl: './leader-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderBoardComponent implements OnInit {
  private websocketService = inject(WebSocketService);

  timmingData!: [string, TimingLine][];

  ngOnInit(): void {
    this.timmingData = Object.entries(
      this.websocketService.liveState$().TimingData.Lines
    ).sort(this.sortPosition);
  }

  private sortPosition(a: any, b: any) {
    const [, aLine] = a;
    const [, bLine] = b;
    const aPos = Number(aLine.Position);
    const bPos = Number(bLine.Position);

    return aPos - bPos;
  }

  get first10Lines() {
    return this.timmingData.slice(0, 10);
  }

  get last10Lines() {
    return this.timmingData.slice(10, 20);
  }
}
