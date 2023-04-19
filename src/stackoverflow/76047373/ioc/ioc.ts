import { Container } from 'inversify';
import MySqlInstance from '../db';
import { TYPES } from './types';
import AppDataRepository from '../repositories/AppDataRepository';
import { SequelizeInstance } from './interfaces';

const container = new Container();
container.bind<SequelizeInstance>(TYPES.Sequelize).toConstantValue(MySqlInstance);
container.bind<AppDataRepository>(TYPES.AppDataRepository).to(AppDataRepository);

export { container };
