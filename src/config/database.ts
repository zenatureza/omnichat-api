import { ConnectionOptions } from 'typeorm';

const baseDir = process.env.NODE_ENV !== 'development' ? 'dist' : 'src';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: process.env.POSTGRES_DATABASE ?? 'omnichat.sqlite',
  entities: [`./${baseDir}/modules/**/infra/typeorm/entities/*.entity.{ts,js}`],
  migrations: [`./${baseDir}/database/migrations/*.{ts,js}`],
  cli: {
    migrationsDir: `./${baseDir}/database/migrations`,
  },
  // logging: true,
};

export default config;
