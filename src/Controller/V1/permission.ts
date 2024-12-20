import { Request, Response } from 'express';

import catchAsync from '@/utils/catchAsync';
import PermissionService from '@/service/permission'

class PermissionController {
  static async getPermissions(_: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await PermissionService.getPermissions())
  }
  static async createPermission(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await PermissionService.createPermission(req.body.name))
  }
  static async updatePermission(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await PermissionService.updatePermission({ ...req.body, ...req.params }))
  }
  static async deletePermission(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await PermissionService.deletePermission(Number(req.params.id)))
  }
}

export default PermissionController;
