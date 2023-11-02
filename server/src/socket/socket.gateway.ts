import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://kns-support.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Authorization', 'X-Custom-Header'],
    credentials: true,
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;
  @SubscribeMessage('emailConfirmed')
  async emailConfirmed(
    client: Socket,
    userId: string,
    AccessToken: string,
    RefreshToken: string,
  ) {
    console.log(client);
    console.log(userId);
    client.handshake.headers.cookie = `access_token=${AccessToken}; refresh_token=${RefreshToken}`;
    this.server
      .to(client.id)
      .emit('emailConfirmed', 'Your email is successfully confirmed');
    client.disconnect(true);
  }
}
