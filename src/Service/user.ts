import { Request, Response } from 'express';

import UserRepository from "@/repository/user";

class UserService {
  static async getUsers(_: Request, res: Response): Promise<void> {
    try {
      const users = await UserRepository.getUsers();
      res.status(200).json(users);
      return;
    } catch (error) {
      console.error('Error fetching users by class:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }
}

export default UserService;
