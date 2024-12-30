import httpStatus from 'http-status-codes'

import DB from '@/database'
import Permissions, { BodyUpdate } from '@/model/Permissions'
import { ResponseDefault } from '@/interfaces/response'
import ApiError from '@/utils/ApiError';

class PermissionRepository {
  static async getPermissions(): Promise<ResponseDefault<Permissions[]>> {
    const permissions = await DB.getEntityManager().find(Permissions, {}, { limit: 20 });
    
    return { status: true, data: permissions, error: true, message: '' };
  }
  static async createPermission(name: string): Promise<ResponseDefault> {
    const permissions = await DB.getEntityManager().find(Permissions, { name })

    if (permissions.length > 1) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Permission already exists')
    }

    await DB.getEntityManager().insert(Permissions, { name });

    return { status: true, error: false, data: null, message: 'Create Successfully' }
  }
  static async updatePermission(body: BodyUpdate): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const permissions = await em.findOne(Permissions, { id: body.id });

    if (!permissions) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Permission not found.');
    }

    Object.assign(permissions, { name: body.name });
    await em.flush();

    return { status: true, error: false, data: null, message: 'Update Successfully' };
  }
  static async deletePermission(id: number): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const permissions = await em.findOne(Permissions, { id });

    if (!permissions) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Permission not found.');
    }

    await em.removeAndFlush(permissions);

    return { status: true, error: false, data: null, message: 'Delete Successfully', }
  }
}

export default PermissionRepository;
