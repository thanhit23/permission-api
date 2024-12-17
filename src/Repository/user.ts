import DB from '@/database'
import Users from '@/model/Users'

class UserRepository {
  static async getUsers(): Promise<Users[]> {
    const users = await DB.getEntityManager().find(Users, {});
    return users;
  }
}

export default UserRepository;
