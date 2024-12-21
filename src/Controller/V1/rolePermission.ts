import { Request, Response } from 'express';

import catchAsync from '@/utils/catchAsync';
import RolePermissionService from '@/service/rolePermission'

class RolePermissionController {
  static async getRolePermissions(_: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await RolePermissionService.getRolePermissions())
  }
  static async createRolePermission(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await RolePermissionService.createRolePermission(req.body))
  }
  static async updateRolePermission(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await RolePermissionService.updateRolePermission({ ...req.body, ...req.params }))
  }
  static async deleteRolePermission(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await RolePermissionService.deleteRolePermission(Number(req.params.id)))
  }
}

export default RolePermissionController;
