import { Category } from './category';
import { Film } from './film';
import { Language } from './language';
import { FilmCategory } from './film_category';

Category.belongsToMany(Film, { through: FilmCategory });
Film.belongsToMany(Category, { through: FilmCategory });

Language.hasMany(Film);

export { Category, Film, Language, FilmCategory };
