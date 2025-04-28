export type Map = {
  corners: Corner[];
  marshalLights: Corner[];
  marshalSectors: Corner[];
  candidateLap: CandidateLap;
  circuitKey: number;
  circuitName: string;
  countryIocCode: string;
  countryKey: number;
  countryName: string;
  location: string;
  meetingKey: string;
  meetingName: string;
  meetingOfficialName: string;
  raceDate: string;
  rotation: number;
  round: number;
  trackPositionTime: number[];
  x: number[];
  y: number[];
  year: number;
};

export type CandidateLap = {
  driverNumber: string;
  lapNumber: number;
  lapStartDate: string;
  lapStartSessionTime: number;
  lapTime: number;
  session: string;
  sessionStartTime: number;
};

export type Corner = {
  angle: number;
  length: number;
  number: number;
  trackPosition: TrackPosition;
};

export type MapCorner = {
  number: number;
  pos: TrackPosition;
  labelPos: TrackPosition;
};

export type TrackPosition = {
  x: number;
  y: number;
};

export type MapSector = {
  number: number;
  start: TrackPosition;
  end: TrackPosition;
  points: TrackPosition[];
};

export type RenderedSector = {
  number: number;
  d: string;
  color: string;
  strokeWidth: number;
  pulse?: number;
};
