import { CarData } from './car.model';
import { F1ExtrapolatedClock } from './clock.model';
import { Driver } from './driver.model';
import { Heartbeat } from './hearthbeat.model';
import { Laps } from './laps.model';
import { RaceControlMessage } from './race-control.model';
import { SessionInfo } from './session.model';
import { TimingAppData } from './timing-app-data.model';
import { TimingData } from './timing-data.model';
import { TimingStats } from './timing-stats.model';
import { TrackStatus } from './track-status.model';
import { WeatherData } from './weather';

export type LiveTimming = {
  Heartbeat: Heartbeat;
  ExtrapolatedClock: F1ExtrapolatedClock;
  SessionInfo: SessionInfo;
  TrackStatus: TrackStatus;
  DriverList: { [key: string]: Driver };
  RaceControlMessages: RaceControlMessage;
  LapCount: Laps;
  WeatherData: WeatherData;
  TimingData: TimingData;
  TimingStats: TimingStats;
  TimingAppData: TimingAppData;
  CarData: CarData;
  // positionBatches: DriverPositionBatch[];
  // teamRadios: TeamRadioType[];
};
