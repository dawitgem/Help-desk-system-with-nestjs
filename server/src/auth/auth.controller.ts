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

  private setAccessTokenCookie = (res: Response, AccessToken: string) => {
    res.cookie('access_token', AccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: '/',
    });
  };

  @Post('signup')
  async signup(@Req() req: request, @Res({ passthrough: true }) res: Response) {
    const AccessToken = await this.authService.SignUp(req.body);
    res.clearCookie('access_token');
    this.setAccessTokenCookie(res, AccessToken);
    res.send('successfully registerd');
  }

  @Post('login')
  async signin(@Req() req: request, @Res({ passthrough: true }) res: Response) {
    const AccessToken = await this.authService.SignIn(req.body);
    res.clearCookie('access_token');
    this.setAccessTokenCookie(res, AccessToken);
    res.send('successfully loggedin');
  }
  @Post('googleAuth')
  async signinwithGoogle(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const AccessToken = await this.authService.signInWithGoogle(req.body);
    res.clearCookie('access_token');
    this.setAccessTokenCookie(res, AccessToken);
    res.send({ status: 'ok' });
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
