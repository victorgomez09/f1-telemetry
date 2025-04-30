import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ScheduleEvent } from '../../core/models/schedule-event.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleEventService {
  private httpClient = inject(HttpClient);

  scheduleEvents: WritableSignal<ScheduleEvent[]> = signal([]);

  findAll() {
    return this.httpClient
      .get<ScheduleEvent[]>('http://localhost:3000/schedule-event')
      .subscribe({
        next: (scheduleEvents) => {
          this.scheduleEvents.set(scheduleEvents);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
