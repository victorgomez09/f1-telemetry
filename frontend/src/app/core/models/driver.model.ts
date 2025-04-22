export type Driver = {
  RacingNumber: string;
  BroadcastName: string;
  FullName: string;
  Tla: string;
  Line: number;
  TeamName: string;
  TeamColour: string;
  FirstName: string;
  LastName: string;
  Reference: string;
  HeadshotUrl: string;
};

export type TimeStats = {
  value: string;
  fastest: boolean;
  pb: boolean;
};

export type Sector = {
  current: TimeStats;
  last: TimeStats;
  segments: number[];
};

export type LapTimes = {
  last: TimeStats;
  best: TimeStats;
};

export type Stint = {
  compound: 'soft' | 'medium' | 'hard' | 'intermediate' | 'wet';
  laps: number;
  new: boolean;
};

export type Drs = {
  on: boolean;
  possible: boolean;
};

export type Metrics = {
  gear: number;
  rpm: number;
  speed: number;
};
