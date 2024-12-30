import { BodyUpdate } from "@/model/Roles";
import RoleRepository from "@/repository/role";
import UserRepository from "@/repository/user";

class RoleService {
  static async getRoles(): Promise<any> {
    return await RoleRepository.getRoles();
  }
  static async createRole(body: BodyUpdate): Promise<any> {
    await UserRepository.validateUser(body.user_id);

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
