import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import moment from 'moment';

import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { Laps } from '../../models/laps.model';
import { SessionInfo } from '../../models/session.model';
import { TrackStatus } from '../../models/track-status.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-info',
  imports: [CommonModule],
  templateUrl: './session-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionInfoComponent implements OnInit {
  private websocketService = inject(WebSocketService);

  updated!: Date;

  ngOnInit(): void {
    this.updated = this.websocketService.updated$();
  }

  get updatedDate() {
    return moment.utc(this.updated).format('HH:mm:ss.SSS');
  }

  get sessionInfo() {
    console.log(
      'this.websocketService.liveState$().SessionInfo',
      this.websocketService.sessionInfo()
    );
    return this.websocketService.sessionInfo();
  }

  get trackStatus() {
    return this.websocketService.trackStatus();
  }

  get lapsCount() {
    return this.websocketService.lapCount();
  }

  get extrapolatedClock() {
    return this.websocketService.extrapolatedClock();
  }

  get extrapolatedTimeRemaining() {
    return this.websocketService.extrapolatedTimeRemaining;
  }
}
