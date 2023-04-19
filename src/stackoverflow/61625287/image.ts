import { sequelize } from '../../examples/db';
import Sequelize, {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  Association,
} from 'sequelize';
import Tag from './tag';

class Image extends Model {
  id!: string;
  fileName!: string;
  title!: string;
  Tags!: Tag[];

  public getTags!: BelongsToManyGetAssociationsMixin<Tag>;
  public addTag!: BelongsToManyAddAssociationMixin<Tag, number>;
  public setTags!: BelongsToManySetAssociationsMixin<Tag, number>;
  public hasTag!: BelongsToManyHasAssociationMixin<Tag, number>;
  public removeTag!: BelongsToManyRemoveAssociationMixin<Tag, number>;
  public countTags!: BelongsToManyCountAssociationsMixin;
  public createTag!: BelongsToManyCreateAssociationMixin<Tag>;

  public static associations: {
    tags: Association<Image, Tag>;
  };
}
Image.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'image' },
);

export default Image;
