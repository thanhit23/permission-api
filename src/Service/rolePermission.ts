import { BodyUpdate } from "@/model/RolePermissions";
import RolePermissionRepository from "@/repository/rolePermission";

class RolePermissionService {
  static async getRolePermissions(): Promise<any> {
    return await RolePermissionRepository.getRolePermissions();
  }
  static async createRolePermission(body: BodyUpdate): Promise<any> {
    return await RolePermissionRepository.createRolePermission(body);
  }
  static async updateRolePermission(body: Required<BodyUpdate>): Promise<any> {
    return await RolePermissionRepository.updateRolePermission(body);
  }
  static async deleteRolePermission(id: number): Promise<any> {
    return await RolePermissionRepository.deleteRolePermission(id);
  }
}

export default RolePermissionService;
