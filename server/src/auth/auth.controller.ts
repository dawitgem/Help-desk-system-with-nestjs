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
import { Request as request, response, Response } from 'express';
import { EmailService } from 'src/email/email.service';
import { Timestamp } from 'rxjs';
import { PasswordUpdateException } from 'src/exception/unauthorized.exception';
import { SocketGateway } from 'src/socket/socket.gateway';

const api =
  process.env.NEST_ENV === 'PRODUCTION'
    ? 'https://kns-support.vercel.app'
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
  private removeAccessToken = (res: Response) => {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
      path: '/',
    });
    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
      path: '/',
    });
  };

  @Post('signup')
  async signup(@Req() req: request, @Res({ passthrough: true }) res: Response) {
    this.removeAccessToken(res);
    const EmailToken = await this.authService.generateEmailToken({
      sub: req.body.Id,
      username: req.body.UserName,
    });
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
      throw new PasswordUpdateException(e.message);
    }
  }
  @Get('confirm/:token')
  async verifyEmail(
    @Param('token') token: string,
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      this.removeAccessToken(res);
      const decodedToken = await this.authService.verifyEmailtoken(token);
      if (!decodedToken) throw new PasswordUpdateException('Invalid token...');
      const isTokenExpired = this.isTokenExpired(decodedToken.exp);
      if (isTokenExpired) throw new PasswordUpdateException('Token expired...');
      const user = await this.authService.verifyedUser(decodedToken.sub);
      const payload = { sub: user.Id, userName: user.UserName };
      const AccessToken = await this.authService.generateToken(payload);
      const RefreshToken = await this.authService.generateRefreshToken(payload);
      this.socketGateway.server.emit('setCookie', {
        AccessToken,
        RefreshToken,
      });
      this.setAccessTokenCookie(res, AccessToken, RefreshToken);
      res.redirect(`${api}`);
    } catch (e) {
      throw new PasswordUpdateException(e.message);
    }
  }

  @Post('login')
  async signin(@Req() req: request, @Res({ passthrough: true }) res: Response) {
    this.removeAccessToken(res);
    const { user, AccessToken, RefreshToken } = await this.authService.SignIn(
      req.body,
    );
    if(!user ){
    this.setAccessTokenCookie(res, AccessToken, RefreshToken);
      res.status(200).send('successfully loggedin');
    }
    if (user) {
      const EmailToken = await this.authService.generateEmailToken({
        sub: user.Id,
        username: user.UserName,
      });
      try {
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
        const User = {
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
        return { User, AccessToken, RefreshToken };
      } catch (e) {
        throw new PasswordUpdateException("internal error");
      }
    }
  }
  @Post('agent/signin')
  async agentSignin(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.removeAccessToken(res);
    const { AccessToken, RefreshToken } = await this.authService.agentSignin(
      req.body,
    );
    if (AccessToken && RefreshToken) {
      this.setAccessTokenCookie(res, AccessToken, RefreshToken);
      res.send({ AccessToken, RefreshToken });
    }
  }

  @Post('googleAuth')
  async signinwithGoogle(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.removeAccessToken(res);
    const { user, AccessToken, RefreshToken } =
      await this.authService.signInWithGoogle(req.body);
    if (!user) {
      const EmailToken = await this.authService.generateEmailToken({
        sub: req.body.Id,
        username: req.body.UserName,
      });
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
        const User = {
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
        return { User };
      } catch (e) {
        throw new PasswordUpdateException(e.message);
      }
    }
    if (user && !user.Verified) {
      const EmailToken = await this.authService.generateEmailToken({
        sub: user.Id,
        username: user.UserName,
      });
      try {
        await this.emailService.sendVerificationEmail(user, EmailToken);
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
        const User = {
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
        return { User };
      } catch (e) {
        throw new PasswordUpdateException(e.message);
      }
    } else {
      this.setAccessTokenCookie(res, AccessToken, RefreshToken);
      res.send({ status: 'ok' });
    }
  }

  @Post('googleAuth/agent')
  async signinwithGoogleAgent(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.removeAccessToken(res);
    const { AccessToken, RefreshToken } =
      await this.authService.signInWithGoogleAgent(req.body);
    this.setAccessTokenCookie(res, AccessToken, RefreshToken);
    res.status(200).send("user logged in successfully");
  }

  @Get('signout')
  async signout(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
        path: '/',
      });
      res.clearCookie('refresh_token',  {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
        path: '/',
      });
      
    } catch (error) {
      console.log("error come on man")
      
    }
  }

  @UseGuards(JWTGuard)
  @Get('profile')
  async getProfile(@Req() req) {
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
    } = await this.authService.UserProfile(userId);

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
  @Get('setCookie')
  async setCookie(
    @Req() req: request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { AccessToken, RefreshToken } = req.body;
    this.setAccessTokenCookie(res, AccessToken, RefreshToken);
    res.status(200).send('email confirmed');
  }
  @Get('refresh')
  async refreshAccessToken(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
          try {
      const decodedToken = this.authService.validateToken(
        req.cookies['refresh_token'],
      );
      if (!decodedToken || this.isTokenExpired(decodedToken.exp))
        throw new UnauthorizedException('User not authorized...');
      const userId = decodedToken.sub;
      const user = await this.authService.UserProfile(userId);
      if (!user) throw new UnauthorizedException('User not authorized...');
      const payload = { sub: user.Id, username: user.UserName };
      const AccessToken = await this.authService.generateToken(payload);
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
        Verified,
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
        Verified,
      });
    } catch (e) {
      throw new UnauthorizedException('User is not authorized .....');
    }
  }
  @Get("resetpassword")
  async resetPassword(){
    
  
  }
}
