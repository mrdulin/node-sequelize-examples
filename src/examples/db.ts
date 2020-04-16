import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { Client } from 'pg';

const dotenvConfigOutput = dotenv.config();
if (dotenvConfigOutput.error) {
  console.error(dotenvConfigOutput.error);
  process.exit(1);
}

const envVars = dotenvConfigOutput.parsed!;
console.log(envVars);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: envVars.POSTGRES_HOST,
  username: envVars.POSTGRES_USER,
  password: envVars.POSTGRES_PASSWORD,
  database: envVars.POSTGRES_DB,
  port: Number.parseInt(envVars.POSTGRES_PORT, 10),
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const pgclient = new Client({
  user: envVars.POSTGRES_USER,
  host: envVars.POSTGRES_HOST,
  database: envVars.POSTGRES_DB,
  password: envVars.POSTGRES_PASSWORD,
  port: Number.parseInt(envVars.POSTGRES_PORT, 10),
});

export { sequelize, pgclient };
