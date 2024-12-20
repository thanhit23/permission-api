import UserRepository from "@/repository/user";
import User from "@/model/Users";

class UserService {
  static async getUsers(): Promise<User[]> {
    return await UserRepository.getUsers();
  }
}

export default UserService;
