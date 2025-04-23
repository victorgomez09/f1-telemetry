import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  WritableSignal,
} from '@angular/core';
import moment from 'moment';

import data from '../../../../EXAMPLE_DATA.json';
import { SessionInfoComponent } from '../../core/components/session-info/session-info.component';
import { LiveTimming } from '../../core/models/f1.model';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { WheatherComponent } from "../../core/components/wheather/wheather.component";
import { LeaderBoardComponent } from "../../core/components/leader-board/leader-board.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SessionInfoComponent, WheatherComponent, LeaderBoardComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private websocketService = inject(WebSocketService);

  connected$!: WritableSignal<boolean>;
  data$!: WritableSignal<LiveTimming>;
  delayMs$!: WritableSignal<number>;
  delayTarget$!: WritableSignal<number>;
  updateDate$!: WritableSignal<Date>;

  dateNow = Date.now();

  constructor() {
    this.websocketService.initWebSocket();
  }

  ngOnInit(): void {
    this.connected$ = this.websocketService.connected$;
    this.data$ = this.websocketService.liveState$;
    this.delayMs$ = this.websocketService.delayMs$;
    this.delayTarget$ = this.websocketService.delayTarget$;
    this.updateDate$ = this.websocketService.updated$;
    this.data$.set(data);
  }

  handleReload() {
    window.location.reload();
  }

  get extrapolatedTimeRemaining() {
    return this.data$().ExtrapolatedClock.Utc &&
      this.data$().ExtrapolatedClock.Remaining
      ? this.data$().ExtrapolatedClock.Extrapolating
        ? moment
            .utc(
              Math.max(
                moment
                  .duration(this.data$().ExtrapolatedClock.Remaining)
                  .subtract(
                    moment
                      .utc()
                      .diff(moment.utc(this.data$().ExtrapolatedClock.Utc))
                  )
                  .asMilliseconds() + this.delayMs$(),
                0
              )
            )
            .format('HH:mm:ss')
        : this.data$().ExtrapolatedClock.Remaining
      : undefined;
  }

  get sessionInfo() {
    return this.data$();
  }
}
