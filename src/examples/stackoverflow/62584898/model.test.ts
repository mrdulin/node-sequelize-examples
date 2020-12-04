import { DataTypes } from 'sequelize';

const mSequelize = {};

jest.mock('../../db', () => {
  return { sequelize: mSequelize };
});

const modelStaticMethodMocks = {
  init: jest.fn(),
};

jest.mock('sequelize', () => {
  class MockModel {
    public static init(attributes, options) {
      modelStaticMethodMocks.init(attributes, options);
    }
  }
  return {
    ...jest.requireActual('sequelize'),
    Model: MockModel,
  };
});

describe('62584898', () => {
  it('should pass', async () => {
    await import('./model');
    expect(modelStaticMethodMocks.init).toBeCalledWith(
      {
        id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
        coordinates: { type: DataTypes.GEOMETRY('POINT', 4326), allowNull: false },
        description: { type: DataTypes.TEXT },
        name: { type: DataTypes.STRING, allowNull: false },
        type_id: { type: DataTypes.NUMBER, allowNull: false },
        owner: { type: DataTypes.TEXT, allowNull: false },
      },
      {
        tableName: 'location',
        sequelize: mSequelize,
        timestamps: false,
      },
    );
  });
});
