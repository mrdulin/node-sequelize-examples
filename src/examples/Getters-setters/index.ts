import { Model, Sequelize, DataTypes } from 'sequelize';
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
  host: envVars.POSTGRES_HOST,
  username: envVars.POSTGRES_USER,
  password: envVars.POSTGRES_PASSWORD,
  database: envVars.POSTGRES_DB,
  port: Number.parseInt(envVars.POSTGRES_PORT, 10),
});

class Foo extends Model {
  public firstname!: string;
  public lastname!: string;
  get fullName() {
    return this.firstname + ' ' + this.lastname;
  }

  set fullName(value) {
    const names = value.split(' ');
    this.setDataValue('firstname', names.slice(0, -1).join(' '));
    this.setDataValue('lastname', names.slice(-1).join(' '));
  }
}

Foo.init(
  {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'foo',
  },
);

export { sequelize, Foo, envVars };
