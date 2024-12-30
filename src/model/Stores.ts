import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
class Stores {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  address!: string;

  @Property()
  owner_id!: number;
}

export type BodyUpdate = {
  id?: number;
  owner_id: number;
  name: string;
  address?: string;
}

export default Stores;
