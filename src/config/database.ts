import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: process.env.POSTGRES_DATABASE ?? 'omnichat.sqlite',
  entities: ['./src/modules/**/infra/typeorm/entities/*.entity.{ts,js}'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  // logging: true,
};

export default config;
