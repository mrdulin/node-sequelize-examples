import { Service } from './service';
import { User } from './user';

Service.hasOne(User);
User.belongsTo(Service);

export { Service, User };
