import { Request, Response } from 'express';
import { omit } from 'lodash';

import AuthenticationService from '@/service/authentication'
import catchAsync from '@/utils/catchAsync';

class AuthenticationController {
  static async register(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await AuthenticationService.register(req.body))
  }
  static async login(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await AuthenticationService.login(req.body))
  }
  static async me(req: Request, res: Response): Promise<void> {
    if (!req?.user) {
      res.status(400).json({
        status: false,
        error: true,
        user: null
      })
      return;
    }

    res.status(200).json({
      user: omit(req?.user, ['password'])
    })
    return;
  }
}

export default AuthenticationController;
