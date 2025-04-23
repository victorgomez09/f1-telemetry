import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Driver } from '../../models/driver.model';

@Component({
  selector: 'app-driver',
  imports: [CommonModule],
  templateUrl: './driver.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverComponent {
  @Input()
  driver!: Driver;
}
