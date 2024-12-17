import { Request, Response } from 'express';
import { omit } from 'lodash';

import AuthenticationService from '@/service/authentication'

class AuthenticationController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const responsive = await AuthenticationService.register(req.body);
      res.status(responsive?.statusCode).json(responsive);
    } catch (err) {
      const error = { statusCode: 500, ...(err instanceof Object ? err : {}) };
      res.status(error?.statusCode).json(error);
      return;
    }
  }
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const responsive = await AuthenticationService.login(req.body);
      res.status(responsive?.statusCode).json(responsive);
    } catch (err) {
      const error = { statusCode: 500, ...(err instanceof Object ? err : {}) };
      res.status(error?.statusCode).json(error);
      return;
    }
  }
  static async me(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      user: omit(req?.user, ['password'])
    })
  }
}

export default AuthenticationController;
