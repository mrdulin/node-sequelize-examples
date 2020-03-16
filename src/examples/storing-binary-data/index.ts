import { sequelize } from '../db';
import { Model, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

class Image extends Model {}
Image.init(
  {
    data: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'images' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const filepath = path.resolve(__dirname, './image.jpeg');
    let data = Buffer.from(fs.readFileSync(filepath));
    const mimeType = mime.getType(filepath);
    const image = await Image.create({ data, mimeType });
    // console.log(image.data, Buffer.isBuffer(image.data));
    const result = await sequelize.query('select id, left(encode(data, \'hex\'), 40) from "images";');
    const outputFilepath = path.resolve(__dirname, './output.jpeg');
    fs.writeFileSync(outputFilepath, image.data, 'base64');
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
