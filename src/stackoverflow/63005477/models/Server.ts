import { sequelize } from '../../../examples/db';
import Sequelize from 'sequelize';

let Server = sequelize.define('server', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: Sequelize.STRING(1400),
    allowNull: false,
  },
  endpoint: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  rooms: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: [{ name: 'General', history: [] }],
  },
});

export default Server;
