import { omit } from 'lodash'
import httpStatus from 'http-status-codes'

import DB from '@/database'
import Users from '@/model/Users'
import Roles, { BodyUpdate } from '@/model/Roles'
import { ResponseDefault } from '@/interfaces/response'

class RoleRepository {
  static async getRoles(): Promise<ResponseDefault<Roles[]>> {
    const permissions = await DB.getEntityManager().find(Roles, {});
    return { status: true, statusCode: httpStatus.OK, data: permissions, error: true, message: '' };
  }
  static async validateUser(id: number): Promise<ResponseDefault<any> | boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await DB.getEntityManager().findOne(Users, { id });

      if (!user) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'User not found.', });
      }

      return resolve(true)
    })
  }
  static async createRole(body: BodyUpdate): Promise<ResponseDefault> {  
    await this.validateUser(body.user_id);

    return new Promise(async (resolve) => {
      await DB.getEntityManager().insert(Roles, body);

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Create Successfully', })
    })
  }
  static async updateRole(body: Required<BodyUpdate>): Promise<ResponseDefault> {
    return new Promise(async (resolve, reject) => {
      const em = DB.getEntityManager().fork();
      const permissions = await em.findOne(Roles, { id: body.id });

      if (!permissions) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Role Permissions not found.', });
      }

      Object.assign(permissions, omit(body, ['id']));
      await em.flush();

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Update Successfully', })
    })
  }
  static async deleteRole(id: number): Promise<ResponseDefault> {
    return new Promise(async (resolve, reject) => {
      const em = DB.getEntityManager().fork();
      const permissions = await em.findOne(Roles, { id });

      if (!permissions) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Role Permissions not found.', });
      }

      await em.removeAndFlush(permissions);

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Delete Successfully', })
    })
  }
}

export default RoleRepository;
