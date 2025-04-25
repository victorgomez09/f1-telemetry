import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AudioPlayerComponent } from "../audio-player/audio-player.component";

@Component({
  selector: 'app-team-radio',
  imports: [CommonModule, LucideAngularModule, AudioPlayerComponent],
  templateUrl: './team-radio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamRadioComponent {
  private websocketService = inject(WebSocketService);

  playing$: WritableSignal<boolean> = signal(false);
  duration$: WritableSignal<number> = signal(0);
  progress$: WritableSignal<number> = signal(0);

  formatDate(date: string) {
    return moment.utc(date).format('HH:mm:ss');
  }

  secondsToMinutes(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds - minutes * 60);

    return `${this.pad(minutes, 2)}:${this.pad(remaining, 2)}`;
  }

  parseAudioPath(path: string) {
    return `https://livetiming.formula1.com/static/${
      this.websocketService.liveState$().SessionInfo.Path
    }${path}`;
  }

  private pad(n: number, l: number) {
    let str = `${n}`;
    while (str.length < l) str = `0${str}`;

    return str;
  }

  private sortUtc(a: any, b: any) {
    const aDate = moment.utc(a.Utc);
    const bDate = moment.utc(b.Utc);

    return bDate.diff(aDate);
  }

  get radios() {
    return [
      ...Object.values(
        this.websocketService.liveState$().TeamRadio.Captures
      ).sort(this.sortUtc),
    ];
  }

  get drivers() {
    return this.websocketService.liveState$().DriverList;
  }
}
