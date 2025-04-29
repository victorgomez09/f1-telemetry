import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { PositionData, PositionEntry } from '../../../models/position.model';
import { Driver } from '../../../models/driver.model';
import { WebSocketService } from '../../../../services/web-socket/web-socket.service';
import { TimingLine } from '../../../models/timing-data.model';

@Component({
  selector: 'app-car-dot',
  imports: [CommonModule],
  templateUrl: './car-dot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarDotComponent implements OnInit {
  private websocketService = inject(WebSocketService);

  @Input({ required: true })
  carData!: [string, PositionEntry];
  @Input({ required: true })
  data!: any;
  @Input({ required: true })
  stroke!: number;

  driver: Driver | null = null;
  timingData: TimingLine | null = null;
  onTrack = false;
  out = false;
  rx = 0;
  ry = 0;
  fontSize = 0;

  ngOnInit(): void {
    this.driver =
      this.websocketService.liveState$().DriverList[this.carData[0]];
    this.timingData =
      this.websocketService.liveState$().TimingData.Lines[this.carData[0]];
    this.onTrack =
      this.carData[1].Status === 'OnTrack' &&
      (this.timingData ? !this.timingData.InPit : true);
    this.out =
      this.timingData?.KnockedOut ||
      this.timingData?.Retired ||
      this.timingData?.Stopped;
    this.rx = this.rotate(
      this.carData[1].X,
      this.carData[1].Y,
      this.data.rotation,
      (Math.max(...this.data.x) - Math.min(...this.data.x)) / 2,
      (Math.max(...this.data.y) - Math.min(...this.data.y)) / 2
    )[0];
    this.ry = this.rotate(
      this.carData[1].X,
      this.carData[1].Y,
      this.data.rotation,
      (Math.max(...this.data.x) - Math.min(...this.data.x)) / 2,
      (Math.max(...this.data.y) - Math.min(...this.data.y)) / 2
    )[1];
    this.fontSize = this.stroke * 3;
  }

  private rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  private deg(rad: number) {
    return rad / (Math.PI / 180);
  }

  private rotate(x: number, y: number, a: number, px: number, py: number) {
    const c = Math.cos(this.rad(a));
    const s = Math.sin(this.rad(a));

    x -= px;
    y -= py;

    const newX = x * c - y * s;
    const newY = y * c + x * s;

    return [newX + px, (newY + py) * -1];
  }
}
