import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-driver-tag',
  imports: [],
  templateUrl: './driver-tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverTagComponent {
  @Input({ required: true })
  teamColor!: string;

  @Input({ required: true })
  short!: string;

  @Input()
  position?: string;
}
