const User = require("../../data-base/user");
const bcrypt = require("../../services/oauth.service");

module.exports = {
  findByEmail: async (email) => {
    const user = await User.findOne({ email });

    return user;
  },

  createdUser: async (userObject) => {
    const hashPassword = await bcrypt.hashPassword(userObject.password);

    return User.create({ ...userObject, password: hashPassword });
  },

  deleteUserByID: async (userId) => {
    return deletedUser = await User.findByIdAndUpdate(userId, { $set: { is_deleted: true } });
  },

  getUserByID: async (userId) => {
    return await User.findById(userId);
  },

  updateUserByID: async (userId,updateData) => {
    return await User.findByIdAndUpdate(userId,updateData)
  }
  
};
