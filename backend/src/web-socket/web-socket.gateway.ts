import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WebSocketService } from './web-socket.service';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';

@WebSocketGateway({
    path: '/ws',
    cors: {
        origin: [
            '*',
            'http://localhost:3000',
            'http://localhost:4200',
            'https://bookish-fortnight-pgqxjg5r4wj366vq-4200.app.github.dev',
        ],
    },
})
export class WebsocketGateway implements OnGatewayConnection {
    private logger = new Logger(WebsocketGateway.name);

    @WebSocketServer()
    server: Server;

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private webSocketService: WebSocketService,
    ) {}

    async handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);

        await this.webSocketService.setupStream();
    }

    addInterval(name: string, milliseconds: number) {
        const callback = () => {
            this.logger.warn(
                `Interval ${name} executing at time (${milliseconds})!`,
            );
        };

        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
    }

    @Interval('dashboard-data', 1000)
    handleDashboardData() {
        this.server.emit(
            'dashboard-data',
            JSON.stringify(this.webSocketService.state),
        );
    }
}
