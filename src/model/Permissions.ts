import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Permissions' })
class Permissions {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}

export type BodyUpdate = { id: number; name: string };

export default Permissions;
