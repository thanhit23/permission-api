import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
class Roles {

  @PrimaryKey()
  id!: number;

  @Property()
  user_id!: number;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description = '';
}

export default Roles;
