export type ScheduleEventGroup = {
  event: string;
  eventDays: ScheduleEventDays[];
  location: string;
};

export type ScheduleEventDays = {
  date: Date;
  events: ScheduleEvent[];
};

export type ScheduleEvent = {
  start: Date;
  end: Date;
  name: string;
  location: string;
  type: string;
  summary: string;
  event: string;
};
