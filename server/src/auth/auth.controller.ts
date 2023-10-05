import { Body, Controller, Get, Options, Post } from '@nestjs/common';
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
    return this.authService.SignIn(signin);
  }
  @Post('googleAuth')
  async signinwithGoogle(@Body() signupDto: SignUpDto) {
    const { Id, FullName, Email, UserName, Image, WorkingPhone, MobilePhone } =
      await this.authService.signInWithGoogle(signupDto);
    console.log(
      Id,
      FullName,
      Email,
      UserName,
      Image,
      WorkingPhone,
      MobilePhone,
    );
    return { Id, FullName, UserName, Email, Image, WorkingPhone, MobilePhone };
  }
  @Options()
  handleOptions() {
    // Provide custom response for OPTIONS requests
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin (not recommended for production)
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }
}
