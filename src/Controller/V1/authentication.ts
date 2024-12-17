import { Request, Response } from 'express';

import AuthenticationService from '@/Service/authentication'

class AuthenticationController {
  static async register(req: Request, res: Response): Promise<void> {
    await AuthenticationService.register(req, res);

  }
  static async login(req: Request, res: Response): Promise<void> {
    await AuthenticationService.login(req, res);
  }
  static async me(req: Request, res: Response): Promise<void> {
    console.log('req?.user', req?.user);
    
    res.status(200).json({
      user: req?.user || {}
    })
  }
}

export default AuthenticationController;
