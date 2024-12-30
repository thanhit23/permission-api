import { omit } from 'lodash'
import httpStatus from 'http-status-codes'

import DB from '@/database';
import Users from '@/model/Users';
import ApiError from '@/utils/ApiError';
import { ResponseDefault } from '@/interfaces/response';

class UserRepository {
  static async getUsers(): Promise<ResponseDefault<Users[]>> {
    const users = await DB.getEntityManager().find(Users, {}, { limit: 20, offset: 0 });
    return { status: true, statusCode: httpStatus.OK, data: users.map(item => omit(item, ['password'])), error: true, message: '' };
  }
  static async validateOwnerForStore(id: number): Promise<void> {
    const em = DB.getEntityManager().fork();
    const user = await em.findOne(Users, { id });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not owner')
    }
  }
  static async validateUser(id: number): Promise<void> {
    const user = await DB.getEntityManager().findOne(Users, { id });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found.');
    }
  }
  static async deleteUser(id: number): Promise<ResponseDefault<any>> {
    const em = DB.getEntityManager().fork();
    const users = await DB.getEntityManager().findOne(Users, { id });

    if (!users) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found.');
    }

    await em.removeAndFlush(users);

    return { status: true, error: false, data: null, message: 'Delete Successfully', }
  }
}

export default UserRepository;
