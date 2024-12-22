import { Request, Response } from 'express';

import RoleService from '@/service/role'
import catchAsync from '@/utils/catchAsync';

class RoleController {
  static async getRoles(_: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await RoleService.getRoles())
  }
  static async createRole(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await RoleService.createRole(req.body))
  }
  static async updateRole(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await RoleService.updateRole({ ...req.body, ...req.params }))
  }
  static async deleteRole(req: Request, res: Response): Promise<void> {
    catchAsync(res, async () => await RoleService.deleteRole(Number(req.params.id)))
  }
}

export default RoleController;
