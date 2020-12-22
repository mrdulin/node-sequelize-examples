import { sequelize } from '../../../db';
import { Model } from 'sequelize';

export class Service extends Model {}
Service.init({}, { sequelize, tableName: 'services' });
