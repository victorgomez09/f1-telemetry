export type StatusMessage = {
  message: string;
  color: string;
  trackColor: string;
  bySector?: boolean;
  pulse?: number;
  hex: string;
};

export type MessageMap = {
  [key: string]: StatusMessage;
};
