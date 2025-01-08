import { BodyUpdate } from "@/model/Roles";
import RoleRepository from "@/repository/role";

class RoleService {
  static async getRoles(): Promise<any> {
    return await RoleRepository.getRoles();
  }
  static async createRole(body: BodyUpdate): Promise<any> {
    return await RoleRepository.createRole(body);
  }
  static async updateRole(body: Required<BodyUpdate>): Promise<any> {
    return await RoleRepository.updateRole(body);
  }
  static async deleteRole(id: number): Promise<any> {
    return await RoleRepository.deleteRole(id);
  }
}

export default RoleService;
