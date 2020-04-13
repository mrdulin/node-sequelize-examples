import Author from './author';
import Book from './book';
import AuthorBook from './authorbook';

Author.hasMany(AuthorBook, {
  onUpdate: 'CASCADE',
});
Book.hasMany(AuthorBook, {
  onUpdate: 'CASCADE',
});
AuthorBook.belongsTo(Author, { foreignKey: 'authorId' });
AuthorBook.belongsTo(Book, { foreignKey: 'bookId' });

export { Author, Book, AuthorBook };
