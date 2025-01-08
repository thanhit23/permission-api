import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Role_Permissions' })
class RolePermissions {

  @PrimaryKey()
  id!: number;
  
  @Property()
  role_id!: number;

  @Property()
  permission_id!: number;
}

export type BodyUpdate = {
  id?: number;
  role_id: number;
  permission_id: number;
}

export default RolePermissions;
