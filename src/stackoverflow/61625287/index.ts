import Image from './image';
import Tag from './tag';
import { sequelize } from '../../examples/db';

const ImageTags = Image.belongsToMany(Tag, {
  through: 'ImageTags',
});
const TagImages = Tag.belongsToMany(Image, {
  through: 'ImageTags',
});

export default sequelize;
export { Image, ImageTags, Tag, TagImages };
