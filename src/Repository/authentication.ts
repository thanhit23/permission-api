import bcrypt from 'bcrypt';
import httpStatus from 'http-status-codes';

import DB from '@/database'
import Users from '@/model/Users'
import { RegisterBody, LoginBody } from '@/model/Users'

class UserRepository {
  static async register(body: RegisterBody): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const users = await DB.getEntityManager().find(Users, { email: body.email })
      const password = bcrypt.hashSync(body.password, 10);

      if (users.length > 1) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, error: true, message: 'Email already exists', });
      }

      await DB.getEntityManager().insert(Users, {
        name: body.name,
        email: body.email,
        password,
      })

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: true, message: 'Create Successfully', })
    })
  }
  static async login(body: LoginBody): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const users = await DB.getEntityManager().find(Users, { email: body.email })

      if (users.length === 0) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, error: true, message: 'Email already exists', });
      }

      const checkPassword = bcrypt.compareSync(body.password, users[0].password)

      if (users.length === 1 && checkPassword) {
        return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: users[0], message: 'Login Successfully', });
      }
    })
  }
}

export default UserRepository;
