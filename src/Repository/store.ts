import { omit } from 'lodash'
import httpStatus from 'http-status-codes'

import DB from '@/database'
import ApiError from '@/utils/ApiError';
import Stores, { BodyUpdate } from "@/model/Stores";
import { ResponseDefault } from '@/interfaces/response';

class StoreRepository {
  static async getStores(): Promise<ResponseDefault<Stores[]>> {
    const store = await DB.getEntityManager().find(Stores, {}, { limit: 20 });
    return { status: true, statusCode: httpStatus.OK, data: store, error: true, message: '' };
  }
  static async createStore(body: BodyUpdate): Promise<ResponseDefault> {  
    await DB.getEntityManager().insert(Stores, body);

    return { status: true, error: false, data: null, message: 'Create Successfully' };
  }
  static async updateStore(body: Required<BodyUpdate>): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const store = await em.findOne(Stores, { id: body.id });

    if (!store) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Store not found.')
    }

    Object.assign(store, omit(body, ['id']));
    await em.flush();

    return { status: true, error: false, data: null, message: 'Update Successfully' }
  }
  static async deleteStore(id: number): Promise<ResponseDefault> {
    const em = DB.getEntityManager().fork();
    const store = await em.findOne(Stores, { id });

    if (!store) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Store not found.')
    }

    await em.removeAndFlush(store);

    return { status: true, error: false, data: null, message: 'Delete Successfully', }
  }
}

export default StoreRepository;
