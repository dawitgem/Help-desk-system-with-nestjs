import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static authSerivce: AuthService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies['access_token']) {
      return req.cookies['access_token'];
    }
    return null;
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
