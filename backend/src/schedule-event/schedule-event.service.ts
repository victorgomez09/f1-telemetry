import { Injectable } from '@nestjs/common';
import ical from 'node-ical';
import {
    ScheduleEvent,
    ScheduleEventDays,
    ScheduleEventGroup,
    ScheduleEventIcs,
} from './schedule-event.model';

@Injectable()
export class ScheduleEventService {
    async findAll(): Promise<ScheduleEventGroup[]> {
        const result: ScheduleEvent[] = [];

        const webEvents = await ical.async.fromURL(
            'https://ics.ecal.com/ecal-sub/660897ca63f9ca0008bcbea6/Formula%201.ics',
        );

        Object.values(webEvents).forEach((event) => {
            if ((event as ScheduleEventIcs).summary) {
                result.push({
                    start: (event as ScheduleEventIcs).start,
                    end: (event as ScheduleEventIcs).end,
                    name: ((event as ScheduleEventIcs).summary.match(
                        /FORMULA 1 (.+?) -/,
                    ) || [])[1],
                    summary: (event as ScheduleEventIcs).summary,
                    event: (event as ScheduleEventIcs).summary,
                    location: (event as ScheduleEventIcs).location,
                    type: ((event as ScheduleEventIcs).summary.match(
                        /-\s*(.+)$/,
                    ) || [])[1],
                });
            }
        });

        return this.groupEventsByStartDay(
            result.sort((a, b) => {
                return a.start.getTime() - b.start.getTime();
            }),
        );
    }

    groupEventsByStartDay(events: ScheduleEvent[]): ScheduleEventGroup[] {
        const eventsByName = new Map<string, ScheduleEvent[]>();

        // Group all events by `name`
        events.forEach((event) => {
            if (!eventsByName.has(event.name)) {
                eventsByName.set(event.name, []);
            }
            eventsByName.get(event.name)!.push(event);
        });

        const result: ScheduleEventGroup[] = [];

        // For each unique event name
        eventsByName.forEach((eventList, eventName) => {
            const dateMap = new Map<string, ScheduleEvent[]>();

            // Group by date
            eventList.forEach((e) => {
                const dateKey = new Date(e.start).toISOString().split('T')[0];
                if (!dateMap.has(dateKey)) {
                    dateMap.set(dateKey, []);
                }
                dateMap.get(dateKey)!.push(e);
            });

            // Convert to ScheduleEventDays[]
            const eventDays: ScheduleEventDays[] = Array.from(dateMap.entries())
                .map(([dateStr, evts]) => ({
                    date: new Date(dateStr),
                    events: evts.sort(
                        (a, b) =>
                            new Date(a.start).getTime() -
                            new Date(b.start).getTime(),
                    ),
                }))
                .sort((a, b) => a.date.getTime() - b.date.getTime());

            result.push({
                event: eventName,
                eventDays,
                location: eventList[0].location,
            });
        });

        return result;
    }
}
