import { F1CarData } from './car.model';
import { F1ExtrapolatedClock } from './clock.model';
import { Driver } from './driver.model';
import { Heartbeat } from './hearthbeat.model';
import { Laps } from './laps.model';
import { DriverPositionBatch } from './position.model';
import { RaceControlMessage } from './race-control.model';
import { TeamRadioType } from './radio.model';
import { SessionInfo } from './session.model';
import { TimmingData } from './timming-data.model';
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
  TimingAppData: TimmingData;
  // positionBatches: DriverPositionBatch[];
  // teamRadios: TeamRadioType[];
  // carData: F1CarData;
};
