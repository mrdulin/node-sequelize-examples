import { pgclient } from '../../db';

function expand(rowCount, columnCount, startAt = 1) {
  var index = startAt;
  return Array(rowCount)
    .fill(0)
    .map(
      (v) =>
        `(${Array(columnCount)
          .fill(0)
          .map((v) => `$${index++}`)
          .join(', ')})`,
    )
    .join(', ');
}
function flatten(arr) {
  var newArr: any[] = [];
  arr.forEach((v) => v.forEach((p) => newArr.push(p)));
  return newArr;
}

(async function test() {
  try {
    await pgclient.connect();
    // create table
    await pgclient.query(`
      CREATE TABLE IF NOT EXISTS filters (
        id serial PRIMARY KEY,
        filter_name VARCHAR(10),
        requests_id INTEGER
      )
    `);
    // test
    const arrayOfFilters = ['CM', 'CBO', 'SA', 'EPS', 'AD'];
    const user_id = 1;
    const arrayOfFiltersParams: any[] = arrayOfFilters.map((el) => [el, user_id]);
    await pgclient.query(
      `INSERT INTO filters(filter_name, requests_id) VALUES ${expand(arrayOfFilters.length, 2)}`,
      flatten(arrayOfFiltersParams),
    );
  } catch (error) {
    console.log(error);
  } finally {
    pgclient.end();
  }
})();
