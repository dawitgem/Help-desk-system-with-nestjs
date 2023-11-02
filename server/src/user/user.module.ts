import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UserService, PrismaService, EmailService, AuthService],
})
export class UserModule {}
