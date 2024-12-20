import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
class RolePermissions {

  @PrimaryKey()
  id!: number;
  
  @Property()
  role_id!: number;

  @Property()
  permission_id!: number;
}

export default RolePermissions;
