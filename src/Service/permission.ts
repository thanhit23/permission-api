import { BodyUpdate } from "@/model/Permissions";
import PermissionRepository from "@/repository/permission";

class PermissionService {
  static async getPermissions(): Promise<any> {
    return await PermissionRepository.getPermissions();
  }
  static async createPermission(name: string): Promise<any> {
    return await PermissionRepository.createPermission(name);
  }
  static async updatePermission(body: BodyUpdate): Promise<any> {
    return await PermissionRepository.updatePermission(body);
  }
  static async deletePermission(id: number): Promise<any> {
    return await PermissionRepository.deletePermission(id);
  }
}

export default PermissionService;
