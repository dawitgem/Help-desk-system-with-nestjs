import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { PassportModule } from '@nestjs/passport';
import { TicketModule } from './ticket/ticket.module';
import { SearchService } from './search/search.service';
import { SearchModule } from './search/search.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { SocketGateway } from './socket/socket.gateway';
import { SocketModule } from './socket/socket.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseService } from './firebase/firebase.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImapService } from './imap/imap.service';
import { ImapModule } from './imap/imap.module';
import { TicketService } from './ticket/ticket.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PassportModule,
    TicketModule,
    SearchModule,
    EmailModule,
    SocketModule,
    FirebaseModule,
    ImapModule,
    TicketModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => require('./imap/email.config')],
    }),
    ImapModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    UserService,
    SearchService,
    EmailService,
    SocketGateway,
    FirebaseService,
    ConfigService,
    ImapService,
    TicketService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
