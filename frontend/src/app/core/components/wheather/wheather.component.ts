import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { LucideAngularModule, ArrowUp } from 'lucide-angular';

import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { WeatherData } from '../../models/weather';

@Component({
  selector: 'app-wheather',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './wheather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WheatherComponent implements OnInit {
  private websocketService = inject(WebSocketService);

  weather!: WeatherData;

  ngOnInit(): void {
    this.weather = this.websocketService.weatherInfo;
  }

  getWeatherUnit(key: string) {
    switch (key) {
      case 'AirTemp':
      case 'TrackTemp':
        return '°C';
      case 'Humidity':
        return '%';
      case 'Pressure':
        return ' mbar';
      case 'WindDirection':
        return '°';
      case 'WindSpeed':
        return ' km/h';
      default:
        return null;
    }
  }

  handleRain(rainfall: number | undefined) {
    if (rainfall === 1) return 'Yes';
    if (rainfall === 0) return 'No';

    return undefined;
  }

  get airTemp() {
    return Number(this.weather.AirTemp);
  }

  get trackTemp() {
    return Number(this.weather.TrackTemp);
  }

  get humidity() {
    return Number(this.weather.Humidity);
  }

  get pressure() {
    return Number(this.weather.Pressure);
  }

  get rainfall() {
    return Number(this.weather.Rainfall);
  }

  get windSpeed() {
    return Number(this.weather.WindSpeed);
  }

  get windDirection() {
    return Number(this.weather.WindDirection);
  }
}
