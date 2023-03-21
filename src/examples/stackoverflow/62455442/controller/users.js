const Users = require('../models/users');

module.exports = {
  async list(req, res) {
    return Users.findAndCountAll({
      limit: 10,
      offset: 0,
    }).then((data) => {
      console.log('Users >>> ', data);
      res.status(201).json({ data });
    });
  },
  async view(req, res) {
    return Users.findOne({
      where: { id: req.params.id },
    }).then((data) => {
      console.log('User Data by ID >>> ', data);
      res.status(201).json({ data });
    });
  },
};
