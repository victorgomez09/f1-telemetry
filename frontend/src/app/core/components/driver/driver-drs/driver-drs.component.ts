import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-driver-drs',
  imports: [CommonModule],
  templateUrl: './driver-drs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverDrsComponent {
  @Input({ required: true })
  on!: boolean;

  @Input({ required: true })
  possible!: boolean;

  @Input({ required: true })
  inPit!: boolean;

  @Input({ required: true })
  pitOut!: boolean;
}
