export type RaceControlMessage = {
  Messages: Message[];
};

type Message = {
  Utc: string;
  Lap?: number;
  Category?: string;
  Flag?: string;
  Scope?: string;
  Message?: string;
};
