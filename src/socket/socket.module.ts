import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { GameService } from './game.service';

@Module({
  providers: [SocketService, SocketGateway, GameService]
})
export class SocketModule {}
