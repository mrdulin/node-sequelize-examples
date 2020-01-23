'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Category', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Last_Update: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.createTable('Language', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Last_Update: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.createTable('Film', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      LanguageID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Language',
          },
          key: 'ID',
        },
        onDelete: 'restrict',
        allowNull: false,
      },
      Title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Release_Year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Rental_Duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Rental_Date: {
        type: Sequelize.DECIMAL(19, 0),
        allowNull: false,
      },
      Length: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Replacement_Cost: {
        type: Sequelize.DECIMAL(19, 0),
        allowNull: false,
      },
      Rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Last_Update: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Special_Features: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Fulltext: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable(
      'Film_Category',
      {
        FilmID: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Film',
            },
            key: 'ID',
          },
          onDelete: 'restrict',
        },
        CategoryID: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Category',
            },
            key: 'ID',
          },
          onDelete: 'cascade',
        },
        Last_Update: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          film_category_unique: {
            fields: ['FilmID', 'CategoryID'],
          },
        },
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    // return Promise.all(
    //   ['Category', 'Language', 'Film_Category', 'Film'].map((tableName) => queryInterface.dropTable(tableName)),
    // );
    return queryInterface.dropAllTables();
  },
};
