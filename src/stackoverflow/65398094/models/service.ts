import { sequelize } from '../../../examples/db';
import { Model } from 'sequelize';

export class Service extends Model {}
Service.init({}, { sequelize, tableName: 'services' });
