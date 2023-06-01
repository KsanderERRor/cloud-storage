import User from '../data-base/user';
import validateSchema from '../api/user/user.validator';
import userService from '../api/user/user.service';
import oauthService from '../services/oauth.service';
import authService from '../api/auth/auth.service';
import uploadUtil from './uploadFile.util';
import fileService from '../api/file/file.service';

import { TReqRegistration, TReqGetUsers, TReturnDocumentOrNull, IGetUsersReturn } from '../types/apiRestGraphQl/user/types';
import { IUserDocument, IOauthDocument } from '../types/data-base/types';
import { ILoginBody, IDeleteTokenArg } from '../types/apiRestGraphQl/auth/types';
import { TReqGetFile, IReturnFiles } from '../types/apiRestGraphQl/file/types';
import { IUploadArg, IUploadResult } from '../types/apiRestGraphQl/file/typesUpload';

export default {
  createUser: async (arg: TReqRegistration['body']): Promise<IUserDocument | Error> => {
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
    } catch (error: any) {
      return error;
    }
  },

  getOneUserById: async (arg: IUserDocument['_id']): Promise<TReturnDocumentOrNull | Error> => {
    try {
      const user = await userService.getUserByID(arg._id);

      if (!user) {
        throw new Error(`User with id ${arg.id} is not defined`);
      }

      if (user.is_deleted === true) {
        throw new Error('user not found');
      }

      return user;
    } catch (error: any) {
      return error;
    }
  },

  getUsersPagination: async (arg: TReqGetUsers['query']): Promise<IGetUsersReturn | Error> => {
    try {
      const { error } = validateSchema.ValidQuerySchema.validate(arg);
      if (error) {
        return error;
      }

      return userService.getAllUsersPagination(arg);
    } catch (error: any) {
      return error;
    }
  },

  updateUser: async (arg: IUserDocument): Promise<TReturnDocumentOrNull | Error> => {
    try {
      const updateData: TReqRegistration['body'] = {
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

      const user = await userService.getUserByID(arg._id);
      if (!user) {
        throw new Error(`User with id ${arg._id} is not defined`);
      }

      if (user.is_deleted === true) {
        throw new Error('user not found');
      }

      const updatedUser = await userService.updateUserByID(arg._id, updateData);
      return updatedUser;
    } catch (error: any) {
      return error;
    }
  },

  deleteUser: async (arg: IUserDocument['_id']): Promise<TReturnDocumentOrNull | Error> => {
    try {
      const user = await userService.getUserByID(arg._id);
      if (!user) {
        throw new Error(`User with id ${arg._id} is not defined`);
      }

      if (user.is_deleted === true) {
        throw new Error('user not found');
      }
      const deletedUser = await User.findByIdAndUpdate(arg._id, { $set: { is_deleted: true } });
      return deletedUser;
    } catch (error: any) {
      return error;
    }
  },

  /// ///////////////////////////////////////////////////oauth/////////////////////////////////////////////////////////

  loginUser: async (arg: ILoginBody): Promise<IOauthDocument> => {
    try {
      const user = await userService.findByEmail(arg.email);

      if (!user) {
        throw new Error(`User with  email ${arg.email} not found`);
      }

      await oauthService.checkPasswords(user.password, arg.password);
      const tokenPair = oauthService.generateAccessTokenPair({ user: user._id });

      const tokens = (await authService.createOauthPair({ ...tokenPair, user: user._id })).toObject();

      return { ...tokens, userData: user };
    } catch (error: any) {
      return error;
    }
  },

  logoutUser: async (arg: IDeleteTokenArg) => {
    try {
      const accessToken = arg.accessToken;

      await authService.deleteByParams({ accessToken });

      return { message: 'user was delete' };
    } catch (error: any) {
      return error;
    }
  },

  /// ///////////////////////////////////////////////////file/////////////////////////////////////////////////////////

  upload: async ({ upload, user }: IUploadArg) => {
    try {
      const { file } = upload;

      if (!file) {
        throw new Error('Upload a file please!');
      }
      const resoult: IUploadResult = await uploadUtil(file);

      await fileService.createFile(resoult as Express.Multer.File, user);

      return { message: `The following file was uploaded successfully: ${file.filename}` };
    } catch (error: any) {
      return error;
    }
  },

  getFilesPagination: async (arg: TReqGetFile['query']): Promise<IReturnFiles> => {
    try {
      const files = await fileService.getFileByParams(arg);

      return files;
    } catch (error: any) {
      return error;
    }
  }
};
