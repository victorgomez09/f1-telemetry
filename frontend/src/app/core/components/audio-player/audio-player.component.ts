import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { WebSocketService } from '../../../services/web-socket/web-socket.service';

@Component({
  selector: 'app-audio-player',
  imports: [LucideAngularModule],
  templateUrl: './audio-player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerComponent implements OnInit {
  private websocketService = inject(WebSocketService);

  @Input({ required: true })
  path!: string;

  audio!: HTMLAudioElement;
  playing$: WritableSignal<boolean> = signal(false);
  duration$: WritableSignal<number> = signal(0);
  progress$: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.audio = new Audio(
      `https://livetiming.formula1.com/static/${
        this.websocketService.liveState$().SessionInfo.Path
      }${this.path}`
    );

    this.audio.onloadedmetadata = (ev: Event) => {
      this.duration$.set(this.audio.duration);
    };

    this.audio.addEventListener('timeupdate', () => {
      this.progress$.set((this.audio.currentTime / this.audio.duration) * 100);
    });

    this.audio.addEventListener('ended', () => {
      this.playing$.set(false);
      this.progress$.set(0);
    });
  }

  play(): void {
    this.audio.play();
    this.playing$.set(true);
  }

  pause(): void {
    this.audio.pause();
    this.playing$.set(false);
  }

  reset(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.playing$.set(false);
  }
}
