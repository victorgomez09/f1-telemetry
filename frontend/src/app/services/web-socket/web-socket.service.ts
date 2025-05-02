import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { LiveTimming } from '../../core/models/f1.model';
import moment from 'moment';
import { Heartbeat } from '../../core/models/hearthbeat.model';
import { ExtrapolatedClock } from '../../core/models/clock.model';
import { CarData } from '../../core/models/car.model';
import { Driver } from '../../core/models/driver.model';
import { Laps } from '../../core/models/laps.model';
import { Position } from '../../core/models/position.model';
import { RaceControlMessage } from '../../core/models/race-control.model';
import { TeamRadio } from '../../core/models/radio.model';
import { SessionInfo, SessionData } from '../../core/models/session.model';
import { TimingAppData } from '../../core/models/timing-app-data.model';
import { TimingData } from '../../core/models/timing-data.model';
import { TimingStats } from '../../core/models/timing-stats.model';
import { TrackStatus } from '../../core/models/track-status.model';
import { WeatherData } from '../../core/models/weather';

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

  // DATA
  heartbeat: WritableSignal<Heartbeat | null> = signal(null);
  extrapolatedClock: WritableSignal<ExtrapolatedClock | null> = signal(null);
  sessionInfo: WritableSignal<SessionInfo | null> = signal(null);
  trackStatus: WritableSignal<TrackStatus | null> = signal(null);
  driverList: WritableSignal<{ [key: string]: Driver } | null> = signal(null);
  raceControlMessages: WritableSignal<RaceControlMessage | null> = signal(null);
  lapCount: WritableSignal<Laps | null> = signal(null);
  weather: WritableSignal<WeatherData | null> = signal(null);
  timing: WritableSignal<TimingData | null> = signal(null);
  timingStats: WritableSignal<TimingStats | null> = signal(null);
  timingApp: WritableSignal<TimingAppData | null> = signal(null);
  carData: WritableSignal<CarData | null> = signal(null);
  session: WritableSignal<SessionData | null> = signal(null);
  teamRadio: WritableSignal<TeamRadio | null> = signal(null);
  position: WritableSignal<Position | null> = signal(null);

  initWebSocket() {
    this.socket = io('http://localhost:3000', { path: '/ws' });

    this.socket.on('connect', () => {
      this.connected$.set(true);
    });

    this.socket.on('dashboard-data', (data) => {
      setTimeout(() => {
        try {
          const d: LiveTimming = JSON.parse(data);
          this.liveState$.set(d);

          this.sessionInfo.set(d.SessionInfo);
          this.trackStatus.set(d.TrackStatus);
          this.driverList.set(d.DriverList);
          this.raceControlMessages.set(d.RaceControlMessages);
          this.lapCount.set(d.LapCount);
          this.weather.set(d.WeatherData);
          this.timing.set(d.TimingData);
          this.timingStats.set(d.TimingStats);
          this.timingApp.set(d.TimingAppData);
          this.carData.set(d.CarData);
          this.session.set(d.SessionData);
          this.teamRadio.set(d.TeamRadio);
          this.position.set(d.Position);

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

  get extrapolatedTimeRemaining() {
    return this.extrapolatedClock() != null &&
      this.extrapolatedClock()!.Utc &&
      this.extrapolatedClock()!.Remaining
      ? this.extrapolatedClock()!.Extrapolating
        ? moment
            .utc(
              Math.max(
                moment
                  .duration(this.extrapolatedClock()!.Remaining)
                  .subtract(
                    moment.utc().diff(moment.utc(this.extrapolatedClock()!.Utc))
                  )
                  .asMilliseconds() + this.delayMs$(),
                0
              )
            )
            .format('HH:mm:ss')
        : this.liveState$().ExtrapolatedClock.Remaining
      : '';
  }
}
