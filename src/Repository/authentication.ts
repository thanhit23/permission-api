import bcrypt from 'bcrypt';
import httpStatus from 'http-status-codes';

import DB from '@/database'
import Users from '@/model/Users'
import ApiError from '@/utils/ApiError';
import { RegisterBody, LoginBody } from '@/model/Users'

class UserRepository {
  static async register(body: RegisterBody) {
    const users = await DB.getEntityManager().find(Users, { email: body.email })
    const password = bcrypt.hashSync(body.password, 10);

    if (users.length > 1) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
    }

    await DB.getEntityManager().insert(Users, {
      name: body.name,
      email: body.email,
      password,
    })

    return { status: true, error: false, data: true, message: 'Create Successfully' }
  }
  static async login(body: LoginBody) {
    const users = await DB.getEntityManager().find(Users, { email: body.email })

    if (users.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
    }

    const checkPassword = bcrypt.compareSync(body.password, users[0].password)

    if (users.length === 1 && !checkPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email or password not correct');
    }

    return { status: true, error: false, data: users[0], message: 'Login Successfully' };
  }
}

export default UserRepository;
