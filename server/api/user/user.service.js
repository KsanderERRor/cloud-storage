const User = require('../../data-base/user');
const bcrypt = require('../../services/oauth.service');

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
    await User.findByIdAndUpdate(userId, { $set: { is_deleted: true } });
  },

  getUserByID: async (userId) => User.findById(userId),

  updateUserByID: async (userId, updateData) => {
    if (updateData.password !== undefined) {
      const hashPassword = await bcrypt.hashPassword(updateData.password);
      return User.findByIdAndUpdate(userId, { ...updateData, password: hashPassword });
    }

    return User.findByIdAndUpdate(userId, updateData);
  },

  getAllUsersPagination: async (query = {}) => {
    const { page = 1, perPage = 5 } = query;
    const skip = (page - 1) * perPage;

    const user = await User.find().limit(perPage).skip(skip);
    const count = await User.count();

    return {
      data: user,
      page,
      perPage,
      total: count
    };
  }
};
