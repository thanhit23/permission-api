import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Roles' })
class Roles {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description = '';
}

export type BodyUpdate = {
  id?: number;
  name: string;
  description?: string;
}


export default Roles;
