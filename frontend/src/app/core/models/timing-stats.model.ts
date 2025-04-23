export type TimingStats = {
  Withheld: boolean;
  Lines: { [key: string]: TimingLine };
};

export type TimingLine = {
  Line: number;
  RacingNumber: string;
  PersonalBestLapTime: {
    Lap?: number;
    Position?: number;
    Value?: string;
  };
  BestSectors: { Position?: number; Value: string }[];
  BestSpeeds: {
    I1: { Position?: number; Value: string };
    I2: { Position?: number; Value: string };
    FL: { Position?: number; Value: string };
    ST: { Position?: number; Value: string };
  };
};
