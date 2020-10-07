import { UniqueConstraintError } from 'sequelize';

try {
  throw new UniqueConstraintError({ message: 'test unique constraint' });
} catch (e) {
  if (e instanceof UniqueConstraintError) {
    console.log(401);
  } else {
    console.log(500);
  }
}
