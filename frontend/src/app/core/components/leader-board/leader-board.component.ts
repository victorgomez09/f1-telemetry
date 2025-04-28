import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { TimingLine } from '../../models/timing-data.model';
import { DriverComponent } from '../driver/driver.component';

@Component({
  selector: 'app-leader-board',
  imports: [CommonModule, DriverComponent],
  templateUrl: './leader-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderBoardComponent implements OnInit {
  private websocketService = inject(WebSocketService);
  private breakpointObserver$ = inject(BreakpointObserver);
  private injector = inject(Injector);

  timmingData!: [string, TimingLine][];
  isMobile$!: Signal<boolean>;

  ngOnInit(): void {
    this.timmingData = Object.entries(
      this.websocketService.liveState$().TimingData.Lines
    ).sort(this.sortPosition);

    this.isMobile$ = toSignal(
      this.breakpointObserver$
        .observe(Breakpoints.Handset)
        .pipe(map((result) => result.matches)),
      { initialValue: true, injector: this.injector }
    );
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
