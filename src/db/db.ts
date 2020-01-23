import { Sequelize } from 'sequelize';
// import { DbInterface } from '../../@types';

// export const createModels = (sequelizeConfig: any): DbInterface => {
//   const { database, username, password, params } = sequelizeConfig;
//   const sequelize = new Sequelize(database, username, password, params);

//   const db: DbInterface = {
//     sequelize,
//     Sequelize,
//   };

//   Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db);
//     }
//   });

//   return db;
// };

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number.parseInt(process.env.POSTGRES_PORT || '5432', 10),
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

export { sequelize };
