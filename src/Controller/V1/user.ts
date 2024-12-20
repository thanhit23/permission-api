import { Request, Response } from 'express';

import UserService from '@/service/user'
import catchAsync from '@/utils/catchAsync';

class UserController {
  static async getUsers(_: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await UserService.getUsers())
  }
}

export default UserController;
