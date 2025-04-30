import { Controller, Get } from '@nestjs/common';

import { ScheduleEventService } from './schedule-event.service';

@Controller('schedule-event')
export class ScheduleEventController {
    constructor(private readonly scheduleService: ScheduleEventService) {}

    @Get()
    findAll() {
        return this.scheduleService.findAll();
    }
}
