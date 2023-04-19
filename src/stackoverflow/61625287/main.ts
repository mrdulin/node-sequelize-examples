import sequelize, { Image as ImageModel, Tag as TagModel } from '.';

async function createImage(file) {
  const image = await ImageModel.create<ImageModel>({
    fileName: file.name,
    title: file.name.replace(/\.[a-z]*$/, ''),
  });
  const [tag, created] = await TagModel.findOrCreate({ where: { title: 'Untagged' } });
  await image.addTag(tag);
  return image.id;
}

async function getImage(id) {
  const image = await ImageModel.findByPk(id, { include: [TagModel] });
  return image.getTags();
}

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const file = { name: 'avatar.jpg' };
    const imageId = await createImage(file);
    const tags = await getImage(imageId);
    console.log('tags:', tags);
  } catch (error) {
    console.log(error);
  } finally {
    sequelize.close();
  }
})();
