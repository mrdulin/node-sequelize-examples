import { Sequelize } from 'sequelize-typescript';

export type SequelizeInstance = InstanceType<typeof Sequelize>;

export interface IAppMetaDataRepository {
  test(): void;
  findOne(): Promise<any>;
}
