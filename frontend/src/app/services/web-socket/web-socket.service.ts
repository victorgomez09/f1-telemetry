import { Injectable, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnInit {
  private socket: Socket;

  constructor() {
    this.socket = io(
      'https://bookish-fortnight-pgqxjg5r4wj366vq-3000.app.github.dev',
      { path: '/ws' }
    );
  }

  ngOnInit(): void {
    this.socket.on('connect', () => {
      this.socket.emit('events', { test: 'test' });

      this.socket.emit('identity', 'Atul', (response: any) =>
        console.log('Identity:', response)
      );
    });

    this.socket.on('message', (data) => {
      console.log('MESSAGE', data);
    });

    this.socket.on('events', (data: any) => {
      console.log('on event', { data: data });
    });

    this.socket.on('exception', (data) => {
      console.log('event', data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected');
    });
  }
}
