import { omit } from 'lodash'
import httpStatus from 'http-status-codes'

import DB from '@/database'
import ApiError from '@/utils/ApiError'
import UserRole, { Body } from '@/model/UserRoles'
import { ResponseDefault } from '@/interfaces/response'

class UserRoleRepository {
  static async getUserRoles(): Promise<ResponseDefault<UserRole[]>> {
    const permissions = await DB.getEntityManager().find(UserRole, {}, { limit: 20 });
    return { status: true, statusCode: httpStatus.OK, data: permissions, error: true, message: '' };
  }
  static async createUserRole(body: Body): Promise<ResponseDefault> {
    const role = await DB.getEntityManager().findOne(UserRole, { user_id: body.user_id, role_id: body.role_id });

    if (role) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Role already exists');
    }

    await DB.getEntityManager().insert(UserRole, body);

    return { status: true, error: false, data: null, message: 'Create Successfully' };
  }
  static async updateUserRole(body: Required<Body>): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const permissions = await em.findOne(UserRole, { id: body.id });

    if (!permissions) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Role not found.')
    }

    Object.assign(permissions, omit(body, ['id']));
    await em.flush();

    return { status: true, error: false, data: null, message: 'Update Successfully' }
  }
  static async deleteUserRole(id: number): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const permissions = await em.findOne(UserRole, { id });

    if (!permissions) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Role not found.')
    }

    await em.removeAndFlush(permissions);

    return { status: true, error: false, data: null, message: 'Delete Successfully', }
  }
}

export default UserRoleRepository;
