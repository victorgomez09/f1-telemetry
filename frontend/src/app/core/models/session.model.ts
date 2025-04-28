export type SessionInfo = {
  Meeting: SessionMeeting;
  ArchiveStatus: SessionArchive;
  Key: number;
  Type: string;
  Name: string;
  StartDate: string;
  EndDate: string;
  GmtOffset: string;
  Path: string;
};

export type SessionMeeting = {
  Key: number;
  Name: string;
  OfficialName: string;
  Location: string;
  Number: number;
  Country: SessionCountry;
  Circuit: SessionCircuit;
};

export type SessionCountry = {
  Key: number;
  Code: string;
  Name: string;
};

export type SessionCircuit = {
  Key: number;
  ShortName: string;
};

export type SessionArchive = {
  Status: string;
};

export type SessionData = {
  Series: SessionDataSerie[];
  StatusSeries: SessionStatusSeries[];
};

export type SessionDataSerie = {
  Utc: string;
  Lap: number;
};

export type SessionStatusSeries = {
  Utc: string;
  TrackStatus?: string;
  SessionStatus?: string;
};

export type SessionStatusMessage = {
  message: string;
  color: string;
  trackColor: string;
  bySector?: boolean;
  pulse?: number;
  hex: string;
};
