import { Request, Response } from 'express';
import { QueryError } from 'mysql2';

import db from '@/database'
import { User } from '@/Model/User'

class UserRepository {
  static async getUsers(): Promise<User[]> {
    try {
      return new Promise<User[]>((resolve, reject) => {
        db.query('SELECT * FROM Users', (err: QueryError, results: User[]) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
    } catch (error) {
      console.error('Error fetching users by class:', error);
      return [];
    }
  }
}

export default UserRepository;
