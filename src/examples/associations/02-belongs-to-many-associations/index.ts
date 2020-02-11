import { Model, DataTypes, BelongsToManyGetAssociationsMixin, HasManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../../db';

class Film extends Model {
  public ID!: number;
  public LanguageID!: number;
  public Title!: string;
  public Description!: string;
  public Release_Year!: number;
  public Rental_Duration!: number;
  public Rental_Date!: number;
  public Length!: number;
  public Replacement_Cost!: number;
  public Rating!: number;
  public Last_Update!: Date;
  public Special_Features!: string;
  public Fulltext!: string;
  public getCategories!: BelongsToManyGetAssociationsMixin<Category>;
}
Film.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    LanguageID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Language',
        key: 'ID',
      },
      onDelete: 'restrict',
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Release_Year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Rental_Duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Rental_Date: {
      type: DataTypes.DECIMAL(19, 0),
      allowNull: false,
    },
    Length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Replacement_Cost: {
      type: DataTypes.DECIMAL(19, 0),
      allowNull: false,
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Last_Update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Special_Features: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fulltext: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Film' },
);

class Category extends Model {
  public ID!: number;
  public Name!: string;
  public Last_Update!: Date;
  public getFilms!: BelongsToManyGetAssociationsMixin<Film>;
}
Category.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Last_Update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Category' },
);

class FilmCategory extends Model {
  public FilmID!: number;
  public CategoryID!: number;
}
FilmCategory.init(
  {
    FilmID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'Film_Category' },
);

class Language extends Model {
  public ID!: number;
  public Name!: string;
  public Last_Update!: Date;
  public getFilms!: HasManyGetAssociationsMixin<Film>;
}

Language.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Last_Update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Language' },
);

Category.belongsToMany(Film, { through: FilmCategory });
Film.belongsToMany(Category, { through: FilmCategory });

Language.hasMany(Film);

export { Film, Category, FilmCategory, Language, sequelize };
