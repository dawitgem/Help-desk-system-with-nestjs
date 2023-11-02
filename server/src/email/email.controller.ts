import { Controller, Get, Param, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('email-verification')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    authService: AuthService,
  ) {}
}
