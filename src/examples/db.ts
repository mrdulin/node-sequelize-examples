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
  dialectOptions: {},
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10 * 1000,
  },
});

const pgclient = new Client({
  user: envVars.POSTGRES_USER,
  host: envVars.POSTGRES_HOST,
  database: envVars.POSTGRES_DB,
  password: envVars.POSTGRES_PASSWORD,
  port: Number.parseInt(envVars.POSTGRES_PORT, 10),
});

async function runTest(commander: () => Promise<void>) {
  try {
    await sequelize.sync({ force: true });
    await commander();
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
}

export { sequelize, pgclient, runTest };
