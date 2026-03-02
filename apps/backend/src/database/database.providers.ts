import { DataSource } from 'typeorm';
import dotenv from 'dotenv'
import { DATA_SOURCE } from 'src/constants';
dotenv.config()

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.PGHOST || 'localhost',
        port: +process.env.PGPORT! || 3306,
        username: process.env.PGUSER || 'root',
        password: process.env.PGPASSWORD || 'root',
        database: process.env.PGDATABASE || 'test',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        migrations: [
          "migrations/*{.ts,.js}"
        ],
        synchronize: true,
        ssl: true
      });

      return dataSource.initialize();
    },
  },
];