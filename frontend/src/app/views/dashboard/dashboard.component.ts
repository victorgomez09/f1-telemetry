import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
  Signal,
  WritableSignal,
} from '@angular/core';
import moment from 'moment';

// import data from '../../../../EXAMPLE_DATA.json';
import { LeaderBoardComponent } from '../../core/components/leader-board/leader-board.component';
import { MapComponent } from '../../core/components/map/map.component';
import { SessionInfoComponent } from '../../core/components/session-info/session-info.component';
import { WheatherComponent } from '../../core/components/wheather/wheather.component';
import { LiveTimming } from '../../core/models/f1.model';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { RaceControlComponent } from '../../core/components/race-control/race-control.component';
import { TeamRadioComponent } from '../../core/components/team-radio/team-radio.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Heartbeat } from '../../core/models/hearthbeat.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    SessionInfoComponent,
    WheatherComponent,
    LeaderBoardComponent,
    MapComponent,
    RaceControlComponent,
    TeamRadioComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private breakpointObserver$ = inject(BreakpointObserver);
  private injector = inject(Injector);
  private websocketService = inject(WebSocketService);

  connected$!: WritableSignal<boolean>;
  data$!: WritableSignal<LiveTimming>;
  delayMs$!: WritableSignal<number>;
  delayTarget$!: WritableSignal<number>;
  updateDate$!: WritableSignal<Date>;

  isMobile$!: Signal<boolean>;

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
    // this.data$.set(data);

    this.isMobile$ = toSignal(
      this.breakpointObserver$
        .observe(Breakpoints.Handset)
        .pipe(map((result) => result.matches)),
      { initialValue: true, injector: this.injector }
    );
  }

  handleReload() {
    window.location.reload();
  }

  get hearthbeat() {
    return this.websocketService.heartbeat();
  }
}
