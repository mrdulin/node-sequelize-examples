import express from 'express';
import path from 'path';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../examples/db';

class Posts extends Model {}
Posts.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, tableName: 'posts' },
);

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', (req, res) => {
  Posts.findAll().then(function(posts) {
    res.render('home.pug', { posts: posts });
  });
});

(async function main() {
  await sequelize.sync({ force: true });
  //seed
  await Posts.bulkCreate([{ name: 'teresa' }, { name: 'teng' }]);
  app.listen(3000, () => console.log('Server started at http://localhost:3000'));
})();
