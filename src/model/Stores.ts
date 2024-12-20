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

export default Stores;
