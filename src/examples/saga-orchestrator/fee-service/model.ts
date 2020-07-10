import { sequelize } from '../../db';
import { Model } from 'sequelize';

class Fee extends Model {}
Fee.init({}, { sequelize, tableName: 'fees', modelName: 'fee' });

export { Fee };
