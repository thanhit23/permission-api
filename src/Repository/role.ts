import { omit } from 'lodash'
import httpStatus from 'http-status-codes'

import DB from '@/database'
import ApiError from '@/utils/ApiError'
import Roles, { BodyUpdate } from '@/model/Roles'
import { ResponseDefault } from '@/interfaces/response'

class RoleRepository {
  static async getRoles(): Promise<ResponseDefault<Roles[]>> {
    const permissions = await DB.getEntityManager().find(Roles, {}, { limit: 20 });
    return { status: true, statusCode: httpStatus.OK, data: permissions, error: true, message: '' };
  }
  static async createRole(body: BodyUpdate): Promise<ResponseDefault> {  
    await DB.getEntityManager().insert(Roles, body);

    return { status: true, error: false, data: null, message: 'Create Successfully' };
  }
  static async updateRole(body: Required<BodyUpdate>): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const permissions = await em.findOne(Roles, { id: body.id });

    if (!permissions) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Role Permissions not found.')
    }

    Object.assign(permissions, omit(body, ['id']));
    await em.flush();

    return { status: true, error: false, data: null, message: 'Update Successfully' }
  }
  static async deleteRole(id: number): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const permissions = await em.findOne(Roles, { id });

    if (!permissions) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Role Permissions not found.')
    }

    await em.removeAndFlush(permissions);

    return { status: true, error: false, data: null, message: 'Delete Successfully', }
  }
}

export default RoleRepository;
