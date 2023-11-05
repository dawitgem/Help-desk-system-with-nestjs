import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CookieSerializeOptions, serialize } from 'cookie';

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
  private client: Socket;
  @SubscribeMessage('emailConfirmed')
  async emailConfirmed(
    client: Socket,
    userId: string,
    AccessToken: string,
    RefreshToken: string,
  ) {
    client.disconnect(true);
  }
}
