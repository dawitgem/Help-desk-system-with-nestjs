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

@Module({
  imports: [UserModule, AuthModule, PassportModule, TicketModule, SearchModule, EmailModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, PrismaService, AuthService, UserService, SearchService, EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
