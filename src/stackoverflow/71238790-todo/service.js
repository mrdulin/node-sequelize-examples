const User = require('./models/user');

module.exports.create = async (data) => {
  await User.create(data);
  return 'yay';
};
