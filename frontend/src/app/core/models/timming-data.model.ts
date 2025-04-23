import { Stint } from './stint.model';

export type TimmingData = {
  Lines: {
    [key: string]: TimmingLine;
  };
};

export type TimmingLine = {
  RacingNumber: string;
  Line: number;
  GridPos: string;
  Stints: Stint[];
};
