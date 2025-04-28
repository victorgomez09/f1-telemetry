import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import moment from 'moment';

import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { Message } from '../../models/race-control.model';
import { SessionStatusSeries } from '../../models/session.model';

@Component({
  selector: 'app-race-control',
  imports: [CommonModule],
  templateUrl: './race-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaceControlComponent implements OnInit {
  private websocketService = inject(WebSocketService);

  messages!: Message[];

  ngOnInit(): void {
    this.messages =
      this.websocketService.liveState$().RaceControlMessages.Messages;
  }

  formatDate(date: string) {
    return moment.utc(date).format('HH:mm:ss');
  }

  getFlagColour(flag: string) {
    switch (flag?.toLowerCase()) {
      case 'green':
        return 'badge-success';
      case 'yellow':
      case 'double yellow':
        return 'badge-warning';
      case 'red':
        return 'badge-error';
      case 'blue':
        return 'badge-info';
      default:
        return 'badge-base-content/60';
    }
  }

  get events(): Message[] & SessionStatusSeries[] {
    return [
      ...Object.values(
        this.websocketService.liveState$().RaceControlMessages.Messages
      ),
      ...Object.values(
        this.websocketService.liveState$().SessionData.StatusSeries
      ),
    ].sort(this.sortUtc);
  }

  private sortUtc(a: any, b: any) {
    const aDate = moment.utc(a.Utc);
    const bDate = moment.utc(b.Utc);

    return bDate.diff(aDate);
  }
}
