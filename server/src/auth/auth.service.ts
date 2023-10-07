import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto, SignUpDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    readonly UserService: UserService,
  ) {}

  async generateToken(payload: any): Promise<string> {
    return this.JWTService.sign(payload);
  }

  async SignIn({ Email, Password }: SignInDto) {
    const user = await this.UserService.Login({ Email });
    if (!user) {
      throw new UnauthorizedException('Email not found');
    }

    if (!this.validatePassword(Password, user.Password))
      throw new UnauthorizedException('Invalid Password');
    const payload = { sub: user.Id, userName: user.UserName };

    return { AccessToken: await this.generateToken(payload) };
  }
  private async validatePassword(
    Password: string,
    HashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(Password, HashPassword);
  }

  async SignUp(signUpDto: SignUpDto) {
    const user = await this.UserService.SignUP(signUpDto);
    return user;
  }

  async signInWithGoogle(signupDto: SignUpDto) {
    const { Email } = signupDto;
    let user = await this.UserService.Login({ Email });
    if (!user) user = await this.UserService.SignUP(signupDto);
    const payload = { sub: user.Id, userName: user.UserName };
    const AccessToken = await this.generateToken(payload);
    return AccessToken;
  }
  async UserProfile({ userId }: any) {
    const { userId: Id } = { userId };
    const user = await this.UserService.User({ Id });
    return user;
  }
}
