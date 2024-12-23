import { omit } from 'lodash'
import httpStatus from 'http-status-codes'

import DB from '@/database'
import Roles from '@/model/Roles'
import ApiError from '@/utils/ApiError'
import Permissions from '@/model/Permissions'
import { ResponseDefault } from '@/interfaces/response'
import RolePermissions, { BodyUpdate } from '@/model/RolePermissions'

class RolePermissionRepository {
  static async getRolePermissions(): Promise<ResponseDefault<RolePermissions[]>> {
    const permissions = await DB.getEntityManager().find(RolePermissions, {}, { limit: 20, offset: 0 });
    return { status: true, statusCode: httpStatus.OK, data: permissions, error: true, message: '' };
  }
  static async validateRoleAndPermission(body: BodyUpdate): Promise<void> {
    const role = await DB.getEntityManager().findOne(Roles, { id: body.role_id });
    if (!role) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Role not found.')
    }

    const permission = await DB.getEntityManager().findOne(Permissions, { id: body.permission_id });
    if (!permission) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Permission not found.')
    }
  }
  static async createRolePermission(body: BodyUpdate): Promise<ResponseDefault> {
    await this.validateRoleAndPermission(body)

    await DB.getEntityManager().insert(RolePermissions, body);

    return { status: true, error: false, data: null, message: 'Create Successfully' }
  }
  static async updateRolePermission(body: Required<BodyUpdate>): Promise<ResponseDefault> {
    await this.validateRoleAndPermission(body)
    const em = DB.getEntityManager().fork();
    const permissions = await em.findOne(RolePermissions, { id: body.id });

    if (!permissions) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Role Permissions not found.')
    }

    Object.assign(permissions, omit(body, ['id']));
    await em.flush();

    return { status: true, error: false, data: null, message: 'Update Successfully' }
  }
  static async deleteRolePermission(id: number): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const permissions = await em.findOne(RolePermissions, { id });

    if (!permissions) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Role Permissions not found.')
    }

    await em.removeAndFlush(permissions);

    return { status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Delete Successfully' }
  }
}

export default RolePermissionRepository;
