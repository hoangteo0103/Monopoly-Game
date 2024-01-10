import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class GameService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  private readonly games: Map<string, Game> = new Map();

  generateGameId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let gameId = '';
    for (let i = 0; i < 5; i++) {
      gameId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return gameId;
  }

  addNewGame(creator: Socket, creatorEmail: string) {
    const gameId = this.generateGameId();
    const newGame = new Game(gameId, creatorEmail);
    newGame.addPlayer(creator, creatorEmail);
    this.games.set(gameId, newGame);
    return gameId;
  }

  joinNewGame(gameId: string, player: Socket, playerEmail: string) {
    const game = this.games.get(gameId);
    if (game) {
      game.addPlayer(player, playerEmail);
    }
  }
}

class Game {
  private players: Map<Socket, string> = new Map();

  constructor(public readonly id: string, public readonly creatorEmail: string) {}

  addPlayer(player: Socket, playerEmail: string) {
    this.players.set(player, playerEmail);
  }
}
