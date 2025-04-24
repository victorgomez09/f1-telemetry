export type RaceControlMessage = {
  Messages: Message[];
};

export type Message = {
  Utc: string;
  Lap?: number;
  Category?: string;
  Flag?: string;
  Scope?: string;
  Message?: string;
};
