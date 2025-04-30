import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ScheduleEventService } from '../../services/schedule-event/schedule-event.service';

@Component({
  selector: 'app-schedule-event',
  imports: [],
  templateUrl: './schedule-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleEventComponent implements OnInit {
  private scheduleEventService = inject(ScheduleEventService);

  ngOnInit(): void {
    this.scheduleEventService.findAll();
  }

  get scheduleEvents() {
    return this.scheduleEventService.scheduleEvents();
  }
}
