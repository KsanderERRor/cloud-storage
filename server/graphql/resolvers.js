const User = require('../data-base/user');
const validateSchema = require('../api/user/user.validator');
const userService = require('../api/user/user.service');

module.exports = {
  createUser: async (arg) => {
    try {
      const { error } = validateSchema.ValidUserSchema.validate(arg);
      if (error) {
        return error;
      }

      const userAlredyExists = await userService.findByEmail(arg.email);

      if (userAlredyExists) {
        throw new Error(`User with  email ${userAlredyExists.email} already exists`);
      }

      return userService.createdUser(arg);
    } catch (error) {
      return error;
    }
  },

  getOneUserById: async (arg) => {
    try {
      const user = await userService.getUserByID(arg.id);

      if (!user) {
        throw new Error(`User with id ${arg.id} is not defined`);
      }

      if (user.is_deleted === true) {
        throw new Error('user not found');
      }

      return user;
    } catch (error) {
      return error;
    }
  },

  getUsersPagination: async (arg) => {
    try {
      const { error } = validateSchema.ValidQuerySchema.validate(arg);
      if (error) {
        return error;
      }

      const { page = 1, perPage = 5 } = arg;
      const skip = (page - 1) * perPage;
      return User.find().where().skip(skip).limit(perPage);
    } catch (error) {
      return error;
    }
  },

  updateUser: async (arg) => {
    try {
      const updateData = {
        email: arg.email,
        password: arg.password,
        discSpace: arg.discSpace,
        userSpace: arg.userSpace,
        avatar: arg.avatar,
        is_deleted: arg.is_deleted
      };

      const { error } = validateSchema.ValidUserUpdateSchema.validate(updateData);
      if (error) {
        return error;
      }

      const user = await userService.getUserByID(arg.id);
      if (!user) {
        throw new Error(`User with id ${arg.id} is not defined`);
      }

      if (user.is_deleted === true) {
        throw new Error('user not found');
      }

      const updatedUser = await userService.updateUserByID(arg.id, updateData);
      return updatedUser;
    } catch (error) {
      return error;
    }
  },

  deleteUser: async (arg) => {
    try {
      const user = await userService.getUserByID(arg.id);
      if (!user) {
        throw new Error(`User with id ${arg.id} is not defined`);
      }

      if (user.is_deleted === true) {
        throw new Error('user not found');
      }
      const deletedUser = await User.findByIdAndUpdate(arg.id, { $set: { is_deleted: true } });
      return deletedUser;
    } catch (error) {
      return error;
    }
  }
};
