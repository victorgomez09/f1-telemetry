import { Stint } from './stint.model';

export type TimingAppData = {
  Lines: { [key: string]: TimingAppLine };
};

export type TimingAppLine = {
  RacingNumber: string;
  Line: number;
  GridPos: string;
  Stints: Stint[];
};
