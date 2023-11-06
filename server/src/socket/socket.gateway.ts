import {
  OnGatewayConnection,
  OnGatewayDisconnect,
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
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  public client: Socket;
  handleConnection(client: any, ...args: any[]) {
    this.client = client;
  }
  handleDisconnect(client: any) {}
  @SubscribeMessage('emailConfirmed')
  async emailConfirmed(client: Socket) {
    client.emit('emailConfirmed', 'email confirmed');
    console.log(client.connected);
    client.disconnect(true);
  }
  @SubscribeMessage('setCookie')
  async setCookie(
    client: Socket,

    data: { AccessToken: string; RefreshToken: string },
  ) {
    console.log(client.connected);
    console.log(data);
    client.handshake.headers.cookie = ``;
    client.disconnect(true);
  }
}
