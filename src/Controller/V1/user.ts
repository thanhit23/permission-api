import { Request, Response } from 'express';

import UserService from '@/service/user'

class UserController {
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      await UserService.getUsers(req, res);
      return;
    } catch (error) {
      console.error('Error fetching users by class:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }
}

export default UserController;
