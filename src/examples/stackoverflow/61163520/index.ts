import { Author, AuthorBook, Book } from './models';
import { sequelize } from '../../db';
import faker from 'faker';

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    const author = await Author.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    const book = await Book.create({
      title: faker.lorem.words(3),
    });
    await AuthorBook.create({ authorId: author.id, bookId: book.id });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
