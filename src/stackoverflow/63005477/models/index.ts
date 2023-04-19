import User from './User';
import Server from './Server';

(User as any).belongsToMany(Server, { through: 'Server_User' });
(Server as any).belongsToMany(User, { through: 'Server_User' });

export { User, Server };
