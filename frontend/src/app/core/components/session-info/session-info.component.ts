import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import moment from 'moment';

import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { Laps } from '../../models/laps.model';
import { SessionInfo } from '../../models/session.model';
import { TrackStatus } from '../../models/track-status.model';

@Component({
  selector: 'app-session-info',
  imports: [],
  templateUrl: './session-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionInfoComponent implements OnInit {
  private websocketService = inject(WebSocketService);

  sessionInfo!: SessionInfo;
  trackStatus!: TrackStatus;
  lapsCount!: Laps;
  extrapolatedTimeRemaining!: string;
  updated!: Date;

  ngOnInit(): void {
    this.sessionInfo = this.websocketService.sessionInfo;
    this.trackStatus = this.websocketService.trackStatus;
    this.lapsCount = this.websocketService.lapsCount;
    this.extrapolatedTimeRemaining =
      this.websocketService.extrapolatedTimeRemaining || '';

    this.updated = this.websocketService.updated$();
  }

  get updatedDate() {
    return moment.utc(this.updated).format('HH:mm:ss.SSS');
  }
}
