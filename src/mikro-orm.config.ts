import { Options, MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  driver: MySqlDriver,
  dbName: 'RBAC',
  host: 'mysql',
  user: 'root',
  password: '123456',
  entities: ['./src/model'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};


export default config;
