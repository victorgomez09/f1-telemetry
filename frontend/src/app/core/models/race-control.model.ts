export type RaceControlMessage = {
  Messages: Message[];
};

type Message = {
  Utc: Date;
  Lap: number;
  Category: string;
  Flag: string;
  Scope: string;
  Message: string;
};
