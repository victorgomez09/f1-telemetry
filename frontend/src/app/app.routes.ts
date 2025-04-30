import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./views/schedule-event/schedule-event.component').then(
        (m) => m.ScheduleEventComponent
      ),
  },
];
