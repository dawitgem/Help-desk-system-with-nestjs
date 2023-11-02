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
  @SubscribeMessage('emailConfirmed')
  async emailConfirmed(
    client: Socket,
    userId: string,
    AccessToken: string,
    RefreshToken: string,
  ) {
    // console.log(client);
    // console.log(userId);
    // const cookieOptions: CookieSerializeOptions = {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   expires: new Date(Date.now() + 15 * 60 * 1000),
    //   path: '/',
    // };
    // const cookieOptions2: CookieSerializeOptions = {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   expires: new Date(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000),
    //   path: '/',
    // };
    // const accessCookie = serialize('access_token', AccessToken, cookieOptions);
    // const refreshCookie = serialize(
    //   'refresh_token',
    //   RefreshToken,
    //   cookieOptions,
    // );

    // client.handshake.headers.cookie = `${accessCookie}; ${refreshCookie}`;

    // this.server
    //   .to(client.id)
    //   .emit('emailConfirmed', 'Your email is successfully confirmed');
    // client.emit('setCookies', [accessCookie, refreshCookie]);
    client.disconnect(true);
  }
}
