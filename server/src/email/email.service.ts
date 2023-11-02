import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

const api =
  process.env.NEXT_PUBLIC_REACT_ENV === 'PRODUCTION'
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
    console.log(verificationToken);
    const decodedToken = await this.authservice.verifyEmailtoken(
      verificationToken,
    );
    console.log(decodedToken);
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
      console.log(e);
    }
  }
}
