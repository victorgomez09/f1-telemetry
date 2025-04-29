export type Position = {
  Position: PositionData[];
};

export type PositionData = {
  Timestamp: string;
  Entries: {
    [key: string]: PositionEntry;
  };
};

export type PositionEntry = {
  Status: string;
  X: number;
  Y: number;
  Z: number;
};
