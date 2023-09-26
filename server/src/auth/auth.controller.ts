import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    const { Id, FullName, UserName, Image, WorkingPhone, MobilePhone } =
      await this.authService.SignUp(signupDto);
    return { Id, FullName, UserName, Image, WorkingPhone, MobilePhone };
  }
  @Post('login')
  async signin(@Body() signin: SignInDto) {
    return this.authService.SignIn;
  }
}
