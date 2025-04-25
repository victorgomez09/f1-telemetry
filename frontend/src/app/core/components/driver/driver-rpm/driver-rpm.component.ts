import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-driver-rpm',
  imports: [],
  templateUrl: './driver-rpm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverRpmComponent {
  @Input({ required: true })
  value!: number;

  @Input({ required: true })
  gear!: number;

  @Input({ required: true })
  rpms!: number;
}
