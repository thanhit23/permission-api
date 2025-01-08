import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Users' })
class Users {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;
}

export type RegisterBody = {
  name: string;
  email: string;
  roleId: number;
  password: string;
}

export type Resposive = {
  statusCode: number;
  status: boolean;
  error: string;
}

export type LoginBody = {
  email: string;
  password: string;
}


export default Users;
