import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedClients.set(userId, client);
      console.log(`Client connected: ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedClients.delete(userId);
      console.log(`Client disconnected: ${userId}`);
    }
  }

  broadcastUserUpdate(userId: string, data: { messageColor: string }) {
    this.connectedClients.forEach((socket, clientId) => {
      if (clientId !== userId) {
        socket.emit('userUpdate', {
          userId,
          messageColor: data.messageColor,
        });
      }
    });
  }
}
