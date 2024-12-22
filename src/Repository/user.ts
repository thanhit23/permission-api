import { omit } from 'lodash'
import httpStatus from 'http-status-codes'

import DB from '@/database';
import Users from '@/model/Users';
import { ResponseDefault } from '@/interfaces/response';

class UserRepository {
  static async getUsers(): Promise<ResponseDefault<Users[]>> {
    const users = await DB.getEntityManager().find(Users, {});
    return { status: true, statusCode: httpStatus.OK, data: users.map(item => omit(item, ['password'])), error: true, message: '' };
  }
  static async deleteUser(id: number): Promise<ResponseDefault<any>> {
    return new Promise(async (resolve, reject) => {
      const em = DB.getEntityManager().fork();
      const users = await DB.getEntityManager().findOne(Users, { id });

      if (!users) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'User not found.', });
      }

      await em.removeAndFlush(users);

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Delete Successfully', })
    })
  }
}

export default UserRepository;
