export type ScheduleEvent = {
  type: string;
  params: string[];
  lastmodified: Date;
  dtstamp: Date;
  location: string;
  'ECAL-SCHEDULE': string;
  start: Date;
  datetype: string;
  end: Date;
  summary: string;
  transparency: string;
  sequence: string;
  uid: string;
  priority: string;
  'MICROSOFT-CDO-IMPORTANCE': string;
  class: string;
  description: string;
  alarms: ScheduleEventAlarm[];
  method: string;
};

export type ScheduleEventAlarm = {
  type: string;
  params: string[];
  trigger: string;
  action: string;
  description: string;
  end: Date;
};
