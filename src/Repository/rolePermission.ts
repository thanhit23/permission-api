import { omit } from 'lodash'
import httpStatus from 'http-status-codes'

import DB from '@/database'
import Roles from '@/model/Roles'
import Permissions from '@/model/Permissions'
import RolePermissions, { BodyUpdate } from '@/model/RolePermissions'
import { ResponseDefault } from '@/interfaces/response'

class RolePermissionRepository {
  static async getRolePermissions(): Promise<ResponseDefault<RolePermissions[]>> {
    const permissions = await DB.getEntityManager().find(RolePermissions, {});
    return { status: true, statusCode: httpStatus.OK, data: permissions, error: true, message: '' };
  }
  static async validateRoleAndPermission(body: BodyUpdate): Promise<ResponseDefault> {
    return new Promise(async (resolve, reject) => {
      const role = await DB.getEntityManager().findOne(Roles, { id: body.role_id });
      if (!role) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Role not found.', });
      }

      const permission = await DB.getEntityManager().findOne(Permissions, { id: body.permission_id });
      if (!permission) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Permission not found.', });
      }

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Create Successfully', })
    })
  }
  static async createRolePermission(body: BodyUpdate): Promise<ResponseDefault> {
    await this.validateRoleAndPermission(body)
    return new Promise(async (resolve) => {
      await DB.getEntityManager().insert(RolePermissions, body);

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Create Successfully', })
    })
  }
  static async updateRolePermission(body: Required<BodyUpdate>): Promise<ResponseDefault> {
    await this.validateRoleAndPermission(body)
    return new Promise(async (resolve, reject) => {
      const em = DB.getEntityManager().fork();
      const permissions = await em.findOne(RolePermissions, { id: body.id });

      if (!permissions) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Role Permissions not found.', });
      }

      Object.assign(permissions, omit(body, ['id']));
      await em.flush();

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Update Successfully', })
    })
  }
  static async deleteRolePermission(id: number): Promise<ResponseDefault> {
    return new Promise(async (resolve, reject) => {
      const em = DB.getEntityManager().fork();
      const permissions = await em.findOne(RolePermissions, { id });

      if (!permissions) {
        return reject({ status: false, statusCode: httpStatus.BAD_REQUEST, data: null, error: true, message: 'Role Permissions not found.', });
      }

      await em.removeAndFlush(permissions);

      return resolve({ status: true, statusCode: httpStatus.OK, error: false, data: null, message: 'Delete Successfully', })
    })
  }
}

export default RolePermissionRepository;
