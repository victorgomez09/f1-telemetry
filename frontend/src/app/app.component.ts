import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WebSocketService } from "./services/web-socket/web-socket.service"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  private socketService = inject(WebSocketService);

  ngOnInit(): void {
  }
}
