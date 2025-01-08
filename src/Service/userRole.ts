import { Body } from "@/model/UserRoles";
import UserRoleRepository from "@/repository/userRole";
import UserRepository from "@/repository/user";
import RoleRepository from "@/repository/role";
import StoreRepository from "@/repository/store";

class UserRoleService {
  static async getUserRoles(): Promise<any> {
    return await UserRoleRepository.getUserRoles();
  }
  static async createUserRole(body: Body): Promise<any> {
    await UserRepository.validateUser(body.user_id);

    await RoleRepository.validateRole(body.role_id);

    if (body?.store_id) {
      await StoreRepository.validateStore(body.store_id);
    }

    return await UserRoleRepository.createUserRole(body);
  }
  static async updateUserRole(body: Required<Body>): Promise<any> {
    if (body?.user_id) {
      await UserRepository.validateUser(body.user_id);
    }

    if (body?.role_id) {
      await RoleRepository.validateRole(body.role_id);
    }

    if (body?.store_id) {
      await StoreRepository.validateStore(body.store_id);
    }

    return await UserRoleRepository.updateUserRole(body);
  }
  static async deleteUserRole(id: number): Promise<any> {
    return await UserRoleRepository.deleteUserRole(id);
  }
}

export default UserRoleService;
