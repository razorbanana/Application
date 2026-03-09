import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config(); 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: +process.env.PGPORT! || 5432,
  username: process.env.PGUSER || 'root',
  password: process.env.PGPASSWORD || 'root',
  database: process.env.PGDATABASE || 'test',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
  ssl: false
});