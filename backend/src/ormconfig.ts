import * as dotenv from "dotenv";
import { join } from "path";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config();

const ormConfig: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [join(__dirname, "**/**.entity{.ts,.js}")],
  migrations: [join(__dirname, "/migrations/**/*{.ts,.js}")],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    migrationsDir: join("src/migrations"),
  },
};

export = ormConfig;
