const User = require('../../data-base/user');
const bcrypt = require('../../services/oauth.service');
const userUtil = require('./user.util');

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
      return User.findByIdAndUpdate(userId, { ...updateData, password: hashPassword }, { new: true });
    }

    return User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  getAllUsersPagination: async (query = {}) => {
    const { page = 1, perPage = 5, ...filterQuery } = query;
    const skip = (page - 1) * perPage;

    const search = userUtil.buildFilterQuery(filterQuery);

    const users = await User.find(search).limit(perPage).skip(skip);

    const count = await User.count(search);

    return {
      dataUsers: users,
      page,
      perPage,
      total: count
    };
  }
};
