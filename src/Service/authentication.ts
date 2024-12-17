import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import config from '@/config/config';
import { TokenTypes } from '@/config/tokens';
import User, { RegisterBody, Resposive } from '@/Model/User';
import AuthenticationRepository from "@/Repository/authentication";

class AuthenticationService {
  static async register(body: RegisterBody): Promise<Resposive> {
    return await AuthenticationRepository.register(body);
  }
  static async generateAuthTokens(user: User) {
    const accessTokenExpires = dayjs().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = this.generateToken(user.id, accessTokenExpires, TokenTypes.ACCESS);
  
    const refreshTokenExpires = dayjs().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = this.generateToken(user.id, refreshTokenExpires, TokenTypes.REFRESH);
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };
  static generateToken(userId: string | number, expires: dayjs.Dayjs, type: keyof typeof TokenTypes, secret = 'SECRET') {
    const payload = {
      sub: userId,
      iat: dayjs().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };
  static async login(req: Request<any, any, RegisterBody>, res: Response): Promise<void> {
    try {
      const responsive = await AuthenticationRepository.login(req.body);

      const token = await this.generateAuthTokens(responsive.data)
      
      res.status(responsive?.statusCode).json({ ...responsive, data: token });
    } catch (err) {
      const error = { statusCode: 500, ...(err instanceof Object ? err : {}) };
      res.status(error?.statusCode).json(error);
      return;
    }
  }
  
}

export default AuthenticationService;
