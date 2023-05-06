const User = require('../data-base/user');

module.exports = {
  getAllUsers: async () => {
    const users = await User.find();
    return users;
  }
};
