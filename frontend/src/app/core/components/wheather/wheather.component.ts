import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { WeatherData } from '../../models/weather';
import { CommonModule } from '@angular/common';
import { GaugeComponent } from '../gauge/gauge.component';

@Component({
  selector: 'app-wheather',
  imports: [CommonModule, GaugeComponent],
  templateUrl: './wheather.component.html',
  styleUrl: './wheather.component.css',
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

  get airTemp() {
    return Number(this.weather.AirTemp);
  }

  get trackTemp() {
    return Number(this.weather.TrackTemp);
  }
}
