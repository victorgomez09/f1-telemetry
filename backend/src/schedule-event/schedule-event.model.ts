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

export type ScheduleEventIcs = {
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
    alarms: ScheduleEventAlarmIcs[];
    method: string;
};

export type ScheduleEventAlarmIcs = {
    type: string;
    params: string[];
    trigger: string;
    action: string;
    description: string;
    end: Date;
};
