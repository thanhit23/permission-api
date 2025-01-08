import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'UserRoles' })
class UserRoles {

  @PrimaryKey()
  id!: number;

  @Property()
  role_id!: number;

  @Property()
  user_id!: number;

  @Property()
  store_id: number | null = null;
}

export type Body = {
  id?: number;
  role_id: number;
  user_id: number;
  store_id?: number;
}

export default UserRoles;
