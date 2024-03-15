import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignUpDto } from 'src/user/user.dto';
import { PasswordUpdateException } from 'src/exception/unauthorized.exception';
import { Response } from 'express';
import bycrpt from "bcrypt"
import { hasSubscribers } from 'diagnostics_channel';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly UserService: UserService,
  ) {}

  async generateEmailToken(payload: any) {
    return this.JWTService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_EMAIL_TOKEN,
    });
  }

  async generateToken(payload: any): Promise<string> {
    return this.JWTService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET_KEY,
    });
  }
  async generateRefreshToken(payload: any): Promise<string> {
    return this.JWTService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });
  }

  validateToken(token: string) {
    try {
      return this.JWTService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });
    } catch (e) {
      return null;
    }
  }
  verifyEmailtoken(token: string) {
    try {
      return this.JWTService.verify(token, {
        secret: process.env.JWT_EMAIL_TOKEN,
      });
    } catch (e) {
      return null;
    }
  }

  async SignIn({ Email, Password }: SignInDto) {
    let user = await this.UserService.Login({ Email });
    let AccessToken: string = null;
    let RefreshToken: string = null;
    if (!user) {
      throw new UnauthorizedException(
        'Email not found.Please enter your valid email !!!',
      );
    }    
     
        if (!this.validatePassword(Password, user.Password))
          throw new UnauthorizedException('Invalid Password');

    if (user.Verified === false) return { user, AccessToken, RefreshToken };
    const payload = { sub: user.Id, userName: user.UserName };
    AccessToken = await this.generateToken(payload);
    RefreshToken = await this.generateRefreshToken(payload);
    user = null;
    return { user, AccessToken, RefreshToken };
  }
  async agentSignin({ Email, Password }: SignInDto) {
    let user = await this.UserService.Login({ Email });
    let AccessToken: string = null;
    let RefreshToken: string = null;
    if (!user) {
      throw new UnauthorizedException(
        'Email not found.Please enter your valid email !!!',
      );
    }
    if (! await this.validatePassword(Password, user.Password))
      throw new UnauthorizedException('Invalid Password');
    const payload = { sub: user.Id, userName: user.UserName };
    AccessToken = await this.generateToken(payload);
    RefreshToken = await this.generateRefreshToken(payload);
    return { AccessToken, RefreshToken };
  }
  private async validatePassword(
    Password: string,
    HashPassword: string,
  ): Promise<boolean> {
    return await bycrpt.compare(Password,HashPassword);
  }

  async SignUp(signUpDto: SignUpDto) {
    const { Email } = signUpDto;
    let user = await this.UserService.Login({ Email });
    if (user) throw new PasswordUpdateException('User already exist....');
    signUpDto.Verified = false;
    user = await this.UserService.SignUP(signUpDto);
    return user;
  }
  async verifyedUser(Id: string) {
    const unverified = await this.UserService.User({ Id });
    const verifiedUser = await this.UserService.updateUser(Id, {
      Verified: true,
    });
    return verifiedUser;
  }

  async signInWithGoogle(signupDto: SignUpDto) {
    const { Email } = signupDto;
    let user = await this.UserService.Login({ Email });
    let AccessToken: string = null;
    let RefreshToken: string = null;
    if (user) {
      const payload = { sub: user.Id, userName: user.UserName };
      AccessToken = await this.generateToken(payload);
      RefreshToken = await this.generateRefreshToken(payload);
    }
    return { user, AccessToken, RefreshToken };
  }
  async signInWithGoogleAgent(signupDto: SignUpDto) {
    const { Email, UserType } = signupDto;
    let user = await this.UserService.LoginAgent({ Email, UserType });
    if (!user)
      throw new PasswordUpdateException('This email is not registered!!!');
    const payload = { sub: user.Id, userName: user.UserName };
    const AccessToken = await this.generateToken(payload);
    const RefreshToken = await this.generateRefreshToken(payload);

    return { AccessToken, RefreshToken };
  }
  async UserProfile(Id: string) {
    const user = await this.UserService.User({ Id });
    return user;
  }
}
