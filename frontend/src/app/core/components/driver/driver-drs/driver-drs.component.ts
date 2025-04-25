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

  @Input()
  knocketOut?: boolean;

  @Input()
  stopped?: boolean;

  @Input()
  retired?: boolean;

  @Input({ required: true })
  pitOut!: boolean;

  @Input({ required: true })
  checkGridPos!: boolean;

  @Input({ required: true })
  position!: number;

  @Input({ required: true })
  gridPosition!: number;

  getStatus() {
    if (this.knocketOut) return 'OUT';
    else if (this.retired) return 'RETIRED'.slice(0, 3);
    else if (this.stopped) return 'STOPPED'.slice(0, 3);
    else if (this.pitOut || this.inPit) return 'PIT';
    else return 'DRS';
  }

  parsePosChangeColour(pos: number, gridPos: number) {
    if (pos < gridPos) return 'text-success';
    if (pos > gridPos) return 'text-error';

    return 'text-base-content';
  }
}
