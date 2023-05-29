/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const User = require('../data-base/user');
const validateSchema = require('../api/user/user.validator');
const userService = require('../api/user/user.service');
const oauthService = require('../services/oauth.service');
const authService = require('../api/auth/auth.service');
const uploadUtil = require('./upload.file.util');
const fileService = require('../api/file/file.service');

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

      return userService.getAllUsersPagination(arg);
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
  },

  /// ///////////////////////////////////////////////////oauth/////////////////////////////////////////////////////////

  loginUser: async (arg) => {
    try {
      const user = await userService.findByEmail(arg.email);

      if (!user) {
        console.log('___________-');
        throw new Error(`User with  email ${user.email} not found`);
      }

      await oauthService.checkPasswords(user.password, arg.password);
      const tokenPair = oauthService.generateAccessTokenPair({ user: user._id });

      const tokens = (await authService.createOauthPair({ ...tokenPair, user: user._id })).toObject();

      return { ...tokens, userData: user };
    } catch (error) {
      return error;
    }
  },

  logoutUser: async (arg) => {
    try {
      const accessToken = arg.token;
      console.log(accessToken);
      await authService.deleteByParams({ accessToken });
      return { message: 'user was delete' };
    } catch (error) {
      return error;
    }
  },

  /// ///////////////////////////////////////////////////file/////////////////////////////////////////////////////////

  upload: async ({ upload, user }) => {
    try {
      const { file } = upload;
      console.log(file);
      if (!file) {
        throw new Error('Upload a file please!');
      }
      const resoult = await uploadUtil(file);

      await fileService.createFile(resoult, user);

      return { message: `The following file was uploaded successfully: ${file.filename}` };
    } catch (error) {
      return error;
    }
  },

  getFilesPagination: async (arg) => {
    try {
      const files = await fileService.getFileByParams(arg);

      return files;
    } catch (error) {
      return error;
    }
  }
};
