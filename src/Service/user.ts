import User from "@/model/Users";
import UserRepository from "@/repository/user";
import { ResponseDefault } from "@/interfaces/response";

class UserService {
  static async getUsers(): Promise<ResponseDefault<User[]>> {
    return await UserRepository.getUsers();
  }
  static async deteteUser(id: number): Promise<ResponseDefault<User[]>> {
    // handle check relationship
    return await UserRepository.deleteUser(id);
  }
}

export default UserService;
