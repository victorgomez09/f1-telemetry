import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './configuration';
import { WebsocketGateway } from './web-socket/web-socket.gateway';
import { WebSocketService } from './web-socket/web-socket.service';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        ScheduleModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService, WebsocketGateway, WebSocketService],
})
export class AppModule {}
