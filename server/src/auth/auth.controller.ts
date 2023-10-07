import {
  Body,
  Controller,
  Get,
  Options,
  Post,
  Req,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/user/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JWTGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Request() signupDto: SignUpDto) {
    const { Id, FullName, UserName, Image, WorkingPhone, MobilePhone } =
      await this.authService.SignUp(signupDto);
    return { Id, FullName, UserName, Image, WorkingPhone, MobilePhone };
  }
  @Post('login')
  async signin(@Body() signin: SignInDto) {
    return this.authService.SignIn(signin);
  }
  @Post('googleAuth')
  async signinwithGoogle(@Req() req, @Res() res) {
    const AccessToken = await this.authService.signInWithGoogle(req.body);
    res.send(AccessToken);
  }
  @UseGuards(JWTGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { userId } = req.user;
    console.log({ userId });
    const { Id, FullName, Email, UserName, Image, WorkingPhone, MobilePhone } =
      await this.authService.UserProfile({ userId });
    return { Id, FullName, Email, UserName, Image, WorkingPhone, MobilePhone };
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
