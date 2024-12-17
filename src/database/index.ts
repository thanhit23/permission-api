import { MikroORM } from '@mikro-orm/core';

import config from '@/mikro-orm.config';

export class Database {
  private static orm: MikroORM;

  static async initialize() {
    if (!this.orm) {
      this.orm = await MikroORM.init(config);
    }
  }

  static getEntityManager() {
    if (!this.orm) {
      throw new Error('Database not initialized. Call Database.initialize() first.');
    }
    return this.orm.em.fork();
  }
}

export default Database;
