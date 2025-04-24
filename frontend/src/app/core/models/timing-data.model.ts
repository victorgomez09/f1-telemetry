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
  BestLapTime: { Value: string; Lap?: number; OverallFastest?: boolean };
  LastLapTime: {
    Value: string;
    Status: number;
    OverallFastest: boolean;
    PersonalFastest: boolean;
  };
  Stats?: any;
};

export type Sector = {
  Stopped: boolean;
  PreviousValue?: string;
  Segments: SectorSegment[];
  Value: string;
  Status: number;
  OverallFastest: boolean;
  PersonalFastest: boolean;
};

export type SectorSegment = {
  Status: number
}

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
