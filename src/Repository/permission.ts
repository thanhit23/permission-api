import httpStatus from 'http-status-codes'

import DB from '@/database'
import Permissions, { BodyUpdate } from '@/model/Permissions'
import { ResponseDefault } from '@/interfaces/response'

class PermissionRepository {
  static async getPermissions(): Promise<ResponseDefault<Permissions[]>> {
    const permissions = await DB.getEntityManager().find(Permissions, {});
    return { status: true, statusCode: httpStatus.OK, data: permissions, error: true, message: '' };
  }
  static async createPermission(name: string): Promise<ResponseDefault> {
    return new Promise(async (resolve, reject) => {
      const permissions = await DB.getEntityManager().find(Permissions, { name })

      if (permissions.length > 1) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Permission already exists', });
      }

      await DB.getEntityManager().insert(Permissions, { name });

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Create Successfully', })
    })
  }
  static async updatePermission(body: BodyUpdate): Promise<ResponseDefault> {
    return new Promise(async (resolve, reject) => {
      const em = DB.getEntityManager().fork();
      const permissions = await em.findOne(Permissions, { id: body.id });

      if (!permissions) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Permissions not found.', });
      }

      Object.assign(permissions, { name: body.name });
      await em.flush();

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Update Successfully', })
    })
  }
  static async deletePermission(id: number): Promise<ResponseDefault> {
    return new Promise(async (resolve, reject) => {
      const em = DB.getEntityManager().fork();
      const permissions = await em.findOne(Permissions, { id });

      if (!permissions) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Permissions not found.', });
      }

      await em.removeAndFlush(permissions);

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Delete Successfully', })
    })
  }
}

export default PermissionRepository;
