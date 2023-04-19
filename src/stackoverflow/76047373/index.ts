import 'reflect-metadata';
import { container } from './ioc/ioc';
import { IAppMetaDataRepository } from './ioc/interfaces';
import { TYPES } from './ioc/types';

const appDataRepository = container.get<IAppMetaDataRepository>(TYPES.AppDataRepository);
appDataRepository.test();
