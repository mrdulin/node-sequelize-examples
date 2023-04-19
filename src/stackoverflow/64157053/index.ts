import { sequelize } from '../../examples/db';
import { QueryTypes } from 'sequelize';

sequelize.query('select * from "User"', { type: QueryTypes.SELECT }).then(console.log);
