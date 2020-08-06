import { sequelize } from '../../db';

for (let i = 0; i < 100; i++) {
  sequelize.query('select pg_sleep(1);');
}

// References
// https://wiki.postgresql.org/wiki/Number_Of_Database_Connections
// https://stackoverflow.com/a/63281088/6463558
// setInterval(() => {
//   sequelize.query('select pg_sleep(1);');
// }, 100);
