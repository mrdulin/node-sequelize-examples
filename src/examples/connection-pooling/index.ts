import { Pool } from 'pg';
import dotenv from 'dotenv';

const dotenvConfigOutput = dotenv.config();
if (dotenvConfigOutput.error) {
  console.error(dotenvConfigOutput.error);
  process.exit(1);
}

const envVars = dotenvConfigOutput.parsed!;
console.log(envVars);

const pool = new Pool({
  host: envVars.POSTGRES_HOST,
  port: +envVars.POSTGRES_PORT,
  user: envVars.POSTGRES_USER,
  password: envVars.POSTGRES_PASSWORD,
  database: envVars.POSTGRES_DB,
  application_name: 'connection-pooling',
  max: 2,
  min: 1,
  idleTimeoutMillis: 10 * 1000,
  connectionTimeoutMillis: 2000,
});

(async function test() {
  try {
    const client = await pool.connect();
    const rval = await client.query('SELECT NOW()');
    // const rval = await pool.query('SELECT NOW()');
    console.log('now: ', rval.rows[0].now);
    console.time('remove idle pool');
    // pool.on('remove', () => {
    //   console.timeEnd('remove idle pool');
    // console.log('pool.idleCount: ', pool.idleCount);
    // console.log('\npool.totalCount: ', pool.totalCount);
    // });
    console.log('pool.idleCount: ', pool.idleCount);
    console.log('pool.totalCount: ', pool.totalCount);
    console.log('release');
    client.release();
    console.log('pool.idleCount: ', pool.idleCount);
    console.log('pool.totalCount: ', pool.totalCount);
    // setTimeout(() => {
    // console.log('release client to connection pooling');
    // client.release();
    // }, 30 * 1000);

    process.on('exit', () => {
      console.timeEnd('remove idle pool');
    });
  } catch (error) {
    console.log(error);
  }
})();
