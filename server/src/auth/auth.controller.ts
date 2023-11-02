import {
  Body,
  Controller,
  Get,
  Options,
  Param,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/user/user.dto';
import { JWTGuard } from './auth.guard';
import { Request as request, Response } from 'express';
import { EmailService } from 'src/email/email.service';
import { Timestamp } from 'rxjs';
import { PasswordUpdateException } from 'src/exception/unauthorized.exception';
import { SocketGateway } from 'src/socket/socket.gateway';

const api =
  process.env.NEXT_PUBLIC_REACT_ENV === 'PRODUCTION'
    ? 'https://kns-support.verce.app'
    : 'http://localhost:3000';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly socketGateway: SocketGateway,
  ) {}

  private setAccessTokenCookie = (
    res: Response,
    AccessToken: string,
    RefreshToken: string,
  ) => {
    res.cookie('access_token', AccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 15 * 60 * 1000),
      path: '/',
    });
    res.cookie('refresh_token', RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000),
      path: '/',
    });
  };

  @Post('signup')
  async signup(@Req() req: request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    const EmailToken = await this.authService.generateEmailToken({
      sub: req.body.Id,
      username: req.body.UserName,
    });
    console.log(EmailToken);
    try {
      const user = await this.authService.SignUp(req.body);

      await this.emailService.sendVerificationEmail(req.body, EmailToken);
      const {
        Id,
        FullName,
        Email,
        UserName,
        UserType,
        Image,
        WorkingPhone,
        MobilePhone,
        Verified,
      } = user;
      res.status(200).send({
        Id,
        FullName,
        Email,
        UserName,
        UserType,
        Image,
        WorkingPhone,
        MobilePhone,
        Verified,
      });
    } catch (e) {
      throw new PasswordUpdateException('something went wrong...');
    }
  }
  @Get('confirm/:token')
  async verifyEmail(
    @Param('token') token: string,
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(token);
    try {
      const decodedToken = await this.authService.verifyEmailtoken(token);
      console.log(decodedToken);
      if (!decodedToken) throw new PasswordUpdateException('Invalid token...');
      const isTokenExpired = this.isTokenExpired(decodedToken.exp);
      if (isTokenExpired) throw new PasswordUpdateException('Token expired...');
      const user = await this.authService.verifyedUser(decodedToken.sub);
      const payload = { sub: user.Id, userName: user.UserName };
      const AccessToken = await this.authService.generateToken(payload);
      const RefreshToken = await this.authService.generateRefreshToken(payload);
      this.socketGateway.server.emit(
        'emailConfirmed',
        user.Id,
        AccessToken,
        RefreshToken,
      );
      this.setAccessTokenCookie(res, AccessToken, RefreshToken);
      res.redirect(`${api}`);
    } catch (e) {}
  }
  @Post('login')
  async signin(@Req() req: request, @Res({ passthrough: true }) res: Response) {
    const { AccessToken, RefreshToken } = await this.authService.SignIn(
      req.body,
    );
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.setAccessTokenCookie(res, AccessToken, RefreshToken);
    res.send('successfully loggedin');
  }
  @Post('googleAuth')
  async signinwithGoogle(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    if (!(await this.authService.signInWithGoogle(req.body))) {
      console.log(req.body);
      const EmailToken = await this.authService.generateEmailToken({
        sub: req.body.Id,
        username: req.body.UserName,
      });
      console.log(EmailToken);
      try {
        await this.authService.SignUp(req.body);
        await this.emailService.sendVerificationEmail(req.body, EmailToken);
      } catch (e) {}
    }
    const { AccessToken, RefreshToken } =
      await this.authService.signInWithGoogle(req.body);
    this.setAccessTokenCookie(res, AccessToken, RefreshToken);
    res.send({ status: 'ok' });
  }

  @Post('googleAuth/agent')
  async signinwithGoogleAgent(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { AccessToken, RefreshToken } =
      await this.authService.signInWithGoogleAgent(req.body);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.setAccessTokenCookie(res, AccessToken, RefreshToken);
    res.send({ status: 'ok' });
  }

  @Get('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.send('user logged out');
  }

  @UseGuards(JWTGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { userId } = req.user;
    const {
      Id,
      FullName,
      Email,
      UserName,
      UserType,
      Image,
      WorkingPhone,
      MobilePhone,
      Verified,
    } = await this.authService.UserProfile({ userId });

    return {
      Id,
      FullName,
      Email,
      UserName,
      UserType,
      Image,
      WorkingPhone,
      MobilePhone,
      Verified,
    };
  }
  private isTokenExpired(expirationTimestamp: number) {
    const now = Date.now() / 1000;
    return now >= expirationTimestamp;
  }
  @Post('refresh')
  async refreshAccessToken(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!req.cookies['refresh_token'])
      throw new UnauthorizedException('User not authorized...');
    try {
      const decodedToken = this.authService.validateToken(
        req.cookies['refresh_token'],
      );
      if (!decodedToken || this.isTokenExpired(decodedToken.exp))
        throw new UnauthorizedException('User not authorized...');
      const userId = decodedToken.sub;
      const user = await this.authService.UserProfile({ userId });
      if (!user) throw new UnauthorizedException('User not authorized...');
      const payload = { sub: user.Id, username: user.UserName };
      const AccessToken = await this.authService.generateToken(payload);
      console.log(AccessToken);
      res.cookie('access_token', AccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        path: '/',
      });
      const {
        Id,
        FullName,
        Email,
        UserName,
        UserType,
        Image,
        WorkingPhone,
        MobilePhone,
      } = user;
      res.send({
        Id,
        FullName,
        Email,
        UserName,
        UserType,
        Image,
        WorkingPhone,
        MobilePhone,
      });
    } catch (e) {
      throw new UnauthorizedException('User is not authorized .....');
    }
  }
}
