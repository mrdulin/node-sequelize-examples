import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const dotenvConfigOutput = dotenv.config();
if (dotenvConfigOutput.error) {
  console.error(dotenvConfigOutput.error);
  process.exit(1);
}

const envVars = dotenvConfigOutput.parsed!;
console.log(envVars);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: envVars.PG_BOUNCER_HOST,
  username: envVars.PG_BOUNCER_USER,
  password: envVars.PG_BOUNCER_PASSWORD,
  database: envVars.POSTGRES_DB,
  port: Number.parseInt(envVars.PG_BOUNCER_PORT, 10),
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  pool: {
    max: 1,
    min: 0,
    idle: 1000,
  },
});

for (let i = 0; i < 100; i++) {
  sequelize.query('select pg_sleep(1);');
}

// architecture: client => pgbouncer => pg
// result: there is only one connection process respect the pool config of sequelize even if pgbouncer has a default pool size(=20)
/*
root@3c9c0fd1bf53:/# ps aux | grep "postgres: testuser"
postgres 13615  0.0  0.7 289496 16064 ?        Ss   08:29   0:00 postgres: testuser node-sequelize-examples [local] idle
postgres 14571  0.0  0.7 288716 14372 ?        Ss   11:26   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45748) SELECT
postgres 86437  0.0  0.6 288804 13704 ?        Ss   00:57   0:00 postgres: testuser node-sequelize-examples [local] idle
 */
