import { QueryError } from 'mysql2';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status-codes';

import db from '@/database'
import { User, RegisterBody, LoginBody } from '@/Model/User'

class UserRepository {
  static async register(body: RegisterBody): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const queryCheckEmail = `SELECT * FROM Users WHERE email = "${body.email}"`;

        db.query(queryCheckEmail, (err: QueryError, results: User[]) => {
          if (err) {
            return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, error: true });
          }

          if (results.length > 1) {
            return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, error: true, message: 'Email already exists', });
          }
        });

        const password = bcrypt.hashSync(body.password, 10);

        db.query(`INSERT INTO Users (name, email, password) VALUES ('${body.name}', '${body.email}', '${password}')`, (err: QueryError) => {
          if (err) {
            return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, error: true });
          }

          return resolve({ status: true, statusCode: httpStatus.CREATED, error: false, message: 'Created successfully', data: {} });
        });
      })
    } catch (error) {
      console.error('Error fetching users by class:', error);
      return [];
    }
  }
  static async login(body: LoginBody): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const queryCheckEmail = `SELECT * FROM Users WHERE email = "${body.email}" LIMIT 1`;

        db.query(queryCheckEmail, (err: QueryError, results: User[]) => {
          if (err) {
            return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, error: true });
          }

          if (results.length === 0) {
            return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, error: true, message: 'Email already exists', });
          }

          const checkPassword = bcrypt.compareSync(body.password, results[0].password)

          if (results.length === 1 && checkPassword) {
            return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: results[0], message: 'Login Successfully', });
          }
        });
      })
    } catch (error) {
      console.error('Error fetching users by class:', error);
      return [];
    }
  }
}

export default UserRepository;
