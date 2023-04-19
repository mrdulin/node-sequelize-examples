import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

const db = new Sequelize('mysql://root:asd123@localhost:3306/mydb');

interface UserAttributes {
  readonly id: number;
  readonly email: string;
  readonly hashedPassword: string;
}
interface UserInstance extends Model<UserAttributes>, UserAttributes {}
type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};

const User = db.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false },
  hashedPassword: { type: DataTypes.STRING, allowNull: false },
}) as UserModelStatic;

(async function test() {
  const user: UserInstance = await User.create({
    id: 1,
    hashedPassword: '123',
    email: 'test@gmail.com',
  });
  user.getDataValue('email');
})();
