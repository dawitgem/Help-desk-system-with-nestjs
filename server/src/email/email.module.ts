import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [
    JwtService,
    AuthService,
    EmailService,
    UserService,
    PrismaService,
    ConfigService,
  ],

  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
