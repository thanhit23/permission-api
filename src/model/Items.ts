import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Items' })
class Items {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  price!: number;

  @Property()
  quantity!: number;

  @Property()
  store_id!: number;
}

export default Items;
