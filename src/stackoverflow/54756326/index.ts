import { pgclient } from '../../examples/db';

(async function test() {
  try {
    await pgclient.connect();
    // create table
    await pgclient.query(`
      CREATE TABLE IF NOT EXISTS my_table (
        id serial PRIMARY KEY,
        arr varchar[]
      )
    `);
    // test
    const array = ['id1', 'id2', 'id3'];
    await pgclient.query(`INSERT INTO my_table (arr) VALUES ($1)`, [array]);
  } catch (error) {
    console.log(error);
  } finally {
    pgclient.end();
  }
})();
