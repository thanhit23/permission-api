import { BodyUpdate } from "@/model/Stores";
import UserRepository from "@/repository/user";
import StoreRepository from "@/repository/store";

class StoreService {
  static async getStores(): Promise<any> {
    return await StoreRepository.getStores();
  }
  static async createStore(body: BodyUpdate): Promise<any> {
    await UserRepository.validateUser(body.owner_id);

    return await StoreRepository.createStore(body);
  }
  static async updateStore(userId: number, body: Required<BodyUpdate>): Promise<any> {
    await UserRepository.validateOwnerForStore(userId);

    return await StoreRepository.updateStore(body);
  }
  static async deleteStore(userId: number, id: number): Promise<any> {
    await UserRepository.validateOwnerForStore(userId);

    return await StoreRepository.deleteStore(id);
  }
}

export default StoreService;
