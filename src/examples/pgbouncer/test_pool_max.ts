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
    max: 20,
    min: 0,
    idle: 1000,
  },
});

for (let i = 0; i < 1000; i++) {
  console.log('index:', i);
  sequelize.query('select pg_sleep(1);');
}

// architecture: client => pgbouncer => pg
// pool.max = 1, pool.idle = 1000
// result: there is only one connection process respect the pool config of sequelize even if pgbouncer has a default pool size(=20)
/*
root@3c9c0fd1bf53:/# ps aux | grep "postgres: testuser"
postgres 13615  0.0  0.7 289496 16064 ?        Ss   08:29   0:00 postgres: testuser node-sequelize-examples [local] idle
postgres 14571  0.0  0.7 288716 14372 ?        Ss   11:26   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45748) SELECT
postgres 86437  0.0  0.6 288804 13704 ?        Ss   00:57   0:00 postgres: testuser node-sequelize-examples [local] idle
 */

// pool.max = 20
// result: 使用两个进程运行该脚本，先运行第一个，连接池里20个连接都被占用，运行第二个，第二个脚本会等待，直到第一个运行完，释放连接到连接池
/*
root@3c9c0fd1bf53:/# ps aux | grep "postgres: testuser"
postgres 13615  0.0  0.7 289496 16064 ?        Ss   08:29   0:00 postgres: testuser node-sequelize-examples [local] idle
postgres 14637  0.0  0.7 288716 14372 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45750) idle
postgres 14638  0.0  0.5 288384 11252 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45752) idle
postgres 14639  0.0  0.5 288384 11248 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45754) idle
postgres 14640  0.0  0.5 288384 11248 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45756) idle
postgres 14641  0.0  0.5 288384 11248 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45758) idle
postgres 14642  0.0  0.5 288384 11252 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45760) idle
postgres 14643  0.0  0.5 288384 11244 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45762) idle
postgres 14644  0.0  0.5 288388 11244 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45764) idle
postgres 14645  0.0  0.5 288388 11244 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45766) idle
postgres 14646  0.0  0.5 288388 11248 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45768) idle
postgres 14647  0.0  0.5 288388 11244 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45770) idle
postgres 14648  0.0  0.5 288388 11244 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45772) idle
postgres 14649  0.0  0.5 288388 11252 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45774) idle
postgres 14650  0.0  0.5 288388 11256 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45776) idle
postgres 14651  0.0  0.5 288388 11252 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45778) idle
postgres 14652  0.0  0.5 288388 11252 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45780) idle
postgres 14653  0.0  0.5 288388 11252 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45782) idle
postgres 14654  0.0  0.5 288388 11256 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45784) idle
postgres 14655  0.0  0.5 288388 11252 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45786) idle
postgres 14656  0.0  0.5 288388 11252 ?        Ss   11:59   0:00 postgres: testuser node-sequelize-examples 172.18.0.1(45788) idle
postgres 86437  0.0  0.6 288804 13704 ?        Ss   00:57   0:00 postgres: testuser node-sequelize-examples [local] idle
 */
