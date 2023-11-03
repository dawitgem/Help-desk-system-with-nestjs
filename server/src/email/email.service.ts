import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PasswordUpdateException } from 'src/exception/unauthorized.exception';

const api =
  process.env.NEST_ENV === 'PRODUCTION'
    ? 'https://kns-support-api.onrender.com'
    : 'http://localhost:8000';
console.log(api);

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private readonly authservice: AuthService,
  ) {}
  async sendVerificationEmail(user: any, verificationToken: string) {
    const decodedToken = await this.authservice.verifyEmailtoken(
      verificationToken,
    );
    const url = `${api}/auth/confirm/${verificationToken}`;
    try {
      await this.mailerService.sendMail({
        to: user.Email,
        subject: 'Account Verification',
        template: './confirmation',
        context: {
          name: user.FullName,
          url,
        },
      });
    } catch (e) {
      throw new PasswordUpdateException(e.message);
    }
  }
}
