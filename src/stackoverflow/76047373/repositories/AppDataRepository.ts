import { inject, injectable } from 'inversify';
import { Repository } from 'sequelize-typescript';
import { IAppMetaDataRepository, SequelizeInstance } from '../ioc/interfaces';
import { TYPES } from '../ioc/types';
import { AppMetaData } from '../models/AppMetaData';

@injectable()
export default class AppDataRepository implements IAppMetaDataRepository {
  private sequelize: SequelizeInstance;
  private readonly repository: Repository<AppMetaData>;

  constructor(@inject(TYPES.Sequelize) sequelize: SequelizeInstance) {
    this.sequelize = sequelize;
    this.repository = sequelize.getRepository(AppMetaData);
  }

  test() {
    console.log(typeof this.sequelize.authenticate === 'function'); // true
    console.log(this.repository.getTableName().toString());
  }

  async findOne() {
    const result = await this.repository.findOne<AppMetaData>();
    if (!result) {
      return null;
    }
    // ...
  }
}
