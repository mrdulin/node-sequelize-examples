import Sequelize, { DataTypes } from 'sequelize';

jest.mock('sequelize', () => {
  return {
    ...jest.requireActual('sequelize'),
    default: jest.fn(() => ({
      define: jest.fn(),
      sync: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      query: jest.fn(),
    })),
    __esModule: true,
  };
});

describe('76657256', () => {
  test('should pass', () => {
    expect(jest.isMockFunction(Sequelize)).toBeTruthy();
    expect(DataTypes.INTEGER).toBeDefined();
  });
});
