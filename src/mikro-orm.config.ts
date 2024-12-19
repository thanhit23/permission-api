import { Options, MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  driver: MySqlDriver,
  dbName: 'RBAC',
  host: '127.0.0.1',
  user: 'root',
  password: '',
  entities: ['./src/model'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default config;
