import { Sequelize } from 'sequelize';
import { envVars } from './env';
import { Client } from 'pg';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: envVars.POSTGRES_HOST,
  username: envVars.POSTGRES_USER,
  password: envVars.POSTGRES_PASSWORD,
  database: envVars.POSTGRES_DB,
  port: Number.parseInt(envVars.POSTGRES_PORT || '5432', 10),
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
  port: Number.parseInt(envVars.POSTGRES_PORT || '5432', 10),
});

export { sequelize, pgclient };
