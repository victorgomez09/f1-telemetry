import { Logger } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  path: '/ws',
  cors: { origin: ['*', 'http://localhost:3000', 'http://localhost:4200'] },
})
export class WebsocketGateway implements OnGatewayConnection {

  private logger = new Logger(WebsocketGateway.name);
  private Record

  handleConnection(client: any, ..._args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

  }
}
