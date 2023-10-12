import {
  Body,
  Controller,
  Get,
  Options,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/user/user.dto';
import { JWTGuard } from './auth.guard';
import { Request as request, Response } from 'express';

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
  async signinwithGoogle(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const AccessToken = await this.authService.signInWithGoogle(req.body);
    res
      .cookie('access_token', AccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ status: 'ok' });
  }
  @Get('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.send('user logged out');
  }
  @UseGuards(JWTGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { userId } = req.user;
    const { Id, FullName, Email, UserName, Image, WorkingPhone, MobilePhone } =
      await this.authService.UserProfile({ userId });

    return { Id, FullName, Email, UserName, Image, WorkingPhone, MobilePhone };
  }
}
