import { sequelize } from '../../examples/db';
import { DataTypes } from 'sequelize';

const Post = sequelize.define('post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Category = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  label: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const PostCategory = sequelize.define('postcategory', {
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
  },

  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

(Post as any).belongsToMany(Category, { through: PostCategory });
(Category as any).belongsToMany(Post, { through: PostCategory });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await (Post as any).bulkCreate(
      [
        { content: 'post 1', photo: 'photo 1', categories: [{ label: 1 }, { label: 2 }] },
        { content: 'post 2', photo: 'photo 2', categories: [{ label: 3 }, { label: 4 }] },
      ],
      { include: [Category] },
    );

    const posts = await (Post as any).findAll({
      include: [{ model: Category }],
      raw: true,
    });
    console.log(posts);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
