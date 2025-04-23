export type TimingData = {
  Lines: {
    [key: string]: TimingLine;
  };
};

export type TimingLine = {
  GapToLeader: string;
  IntervalToPositionAhead: { Value: string; Catching: boolean };
  Line: number;
  Position: string;
  ShowPosition: boolean;
  RacingNumber: string;
  KnockedOut?: boolean;
  Retired: boolean;
  InPit: boolean;
  PitOut: boolean;
  Stopped: boolean;
  Status: number;
  NumberOfLaps?: number;
  NumberOfPitStops?: number;
  Sectors: Sector[];
  Speeds: Speed;
  BestLapTime: { Value: string; Lap?: number };
  LastLapTime: {
    Value: string;
    Status: number;
    OverallFastest: boolean;
    PersonalFastest: boolean;
  };
};

export type Sector = {
  Stopped: boolean;
  PreviousValue?: string;
  Segments: { Status: number }[];
  Value: string;
  Status: number;
  OverallFastest: boolean;
  PersonalFastest: boolean;
};

export type Speed = {
  I1: {
    Value: string;
    Status: number;
    OverallFastest: boolean;
    PersonalFastest: boolean;
  };
  I2: {
    Value: string;
    Status: number;
    OverallFastest: boolean;
    PersonalFastest: boolean;
  };
  FL: {
    Value: string;
    Status: number;
    OverallFastest: boolean;
    PersonalFastest: boolean;
  };
  ST: {
    Value: string;
    Status: number;
    OverallFastest: boolean;
    PersonalFastest: boolean;
  };
};
