import { Injectable } from '@nestjs/common';
import ical from 'node-ical';
import { ScheduleEvent } from './schedule-event.model';

@Injectable()
export class ScheduleEventService {
    async findAll(): Promise<ScheduleEvent[]> {
        const result: ScheduleEvent[] = [];

        const webEvents = await ical.async.fromURL(
            'https://ics.ecal.com/ecal-sub/660897ca63f9ca0008bcbea6/Formula%201.ics',
        );

        Object.values(webEvents).forEach((event) => {
            result.push(event as ScheduleEvent);
        });

        return result;
    }
}
