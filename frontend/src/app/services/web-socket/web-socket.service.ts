import { Injectable, OnInit, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { LiveTimming } from '../../core/models/f1.model';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: Socket;

  liveState$ = signal({} as LiveTimming);
  connected$ = signal(false);
  updated$ = signal(new Date());
  delayMs$ = signal(0);
  delayTarget$ = signal(0);
  triggerConnection$ = signal(0);

  initWebSocket() {
    this.socket = io(
      'https://bookish-fortnight-pgqxjg5r4wj366vq-3000.app.github.dev',
      { path: '/ws' }
    );

    this.socket.on('connect', () => {
      this.connected$.set(true);
    });

    this.socket.on('dashboard-data', (data) => {
      setTimeout(() => {
        try {
          const d = JSON.parse(data);
          this.liveState$.set(d);
          this.updated$.set(new Date());
        } catch (e) {
          console.error(`could not process message: ${e}`);
        }
      }, this.delayMs$());
    });

    this.socket.on('exception', (data) => {
      this.socket.close();
    });

    this.socket.on('disconnect', () => {
      this.connected$.set(false);
    });
  }

  get sessionInfo() {
    return this.liveState$().SessionInfo;
  }

  get trackStatus() {
    return this.liveState$().TrackStatus;
  }

  get lapsCount() {
    return this.liveState$().LapCount;
  }

  get extrapolatedTimeRemaining() {
    return this.liveState$().ExtrapolatedClock.Utc &&
      this.liveState$().ExtrapolatedClock.Remaining
      ? this.liveState$().ExtrapolatedClock.Extrapolating
        ? moment
            .utc(
              Math.max(
                moment
                  .duration(this.liveState$().ExtrapolatedClock.Remaining)
                  .subtract(
                    moment
                      .utc()
                      .diff(moment.utc(this.liveState$().ExtrapolatedClock.Utc))
                  )
                  .asMilliseconds() + this.delayMs$(),
                0
              )
            )
            .format('HH:mm:ss')
        : this.liveState$().ExtrapolatedClock.Remaining
      : undefined;
  }
}
