import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ScheduleEventService } from '../../services/schedule-event/schedule-event.service';
import moment from 'moment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-event',
  imports: [CommonModule],
  templateUrl: './schedule-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleEventComponent implements OnInit {
  private scheduleEventService = inject(ScheduleEventService);

  ngOnInit(): void {
    this.scheduleEventService.findAll();
  }

  parseEventDate(date: Date) {
    return moment.utc(date).format('dddd');
  }

  parseSessionDate(date: Date) {
    return moment.utc(date).format('HH:mm');
  }

  checkEventStatus(event: any) {
    return moment.utc(event.start).isBefore(moment.utc());
  }

  get scheduleEvents() {
    return this.scheduleEventService.scheduleEvents();
  }
}
