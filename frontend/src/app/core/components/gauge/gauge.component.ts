import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  clamping,
  describeArc,
  polarToCartesian,
} from '../../utils/circle.utils';

@Component({
  selector: 'app-gauge',
  imports: [],
  templateUrl: './gauge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaugeComponent implements OnInit {
  @Input({ required: true })
  value!: number;
  @Input({ required: true })
  max!: number;
  @Input({ required: true })
  gradient!: 'temperature' | 'humidity';

  startAngle = -130;
  endAngle = 130;
  size = 50;
  strokeWidth = 5;
  describeArc = describeArc;

  dot!: {
    x: number;
    y: number;
  };

  ngOnInit(): void {
    this.dot = polarToCartesian(
      this.size / 2,
      this.size / 2,
      this.size / 2 - this.strokeWidth / 2,
      clamping(this.value, this.startAngle, this.endAngle, this.max)
    );
  }
}
