import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
