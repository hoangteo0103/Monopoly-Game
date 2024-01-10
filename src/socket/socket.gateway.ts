import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { GameService } from './game.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(
    private readonly socketService: SocketService,
    private readonly gameService: GameService,
  ) {}

  generateGameId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let gameId = '';
    for (let i = 0; i < 5; i++) {
      gameId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return gameId;
  }

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  @SubscribeMessage('events')
  onNewMessage(@MessageBody() data: any) {
    this.server.emit('newMessage', data);
  }

  @SubscribeMessage('newGame') 
  handleCreateNewGame(@MessageBody() data: any) {
  const creatorEmail = data.email; // Get the creator's email from the frontend
  const creator = this.server; // You can adjust this to your needs, e.g., find the socket based on the email
  console.log(data);
  const gameId = this.gameService.addNewGame(creator, creatorEmail);
  this.server.emit('gameCreated', { gameId }); // Send the generated gameId back to the frontend
  }


  @SubscribeMessage('joinGame')
  handleJoinGame(@MessageBody() data: any) {
    const gameId = data.gameId;
    const playerEmail = data.email; // Get the player's email from the frontend
    const player = this.server; // You can adjust this to your needs, e.g., find the socket based on the email
    this.gameService.joinNewGame(gameId, player, playerEmail);
  }
}
