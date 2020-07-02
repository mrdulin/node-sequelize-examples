import { Tool } from './tool';
import { User } from './user';
import { UserTool } from './userTool';

User.belongsToMany(Tool, { through: UserTool });
Tool.belongsToMany(User, { through: UserTool });

export { User, Tool, UserTool };
