const User = require('../models/user');

exports.getUserById = (userId) => {
  return User.findOne({
    where: { user_id: userId, is_deleted: false },
  });
};

exports.getAllUsers = () => {
  return User.findAll({ where: { is_deleted: false } });
};
