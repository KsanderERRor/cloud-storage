import User from '../../data-base/user';
import bcrypt from '../../services/oauth.service';
import userUtil from './user.util';
import { IUserDocument, IUserInput } from '../../types/data-base/types';
import { TReqGetUsers, IGetUsersReturn, TReturnDocumentOrNull } from '../../types/apiRestGraphQl/user/types';

export default {
  findByEmail: (email: IUserInput['email']): Promise<TReturnDocumentOrNull> => User.findOne({ email }),

  createdUser: async (userObject: IUserInput): Promise<IUserDocument> => {
    const hashPassword = await bcrypt.hashPassword(userObject.password);

    return User.create({ ...userObject, password: hashPassword });
  },

  deleteUserByID: (userId: IUserDocument['_id']): Promise<TReturnDocumentOrNull> => User.findByIdAndUpdate(userId, { $set: { is_deleted: true } }),

  getUserByID: (userId: IUserDocument['_id']): Promise<TReturnDocumentOrNull> => User.findById(userId),

  updateUserByID: (userId: IUserDocument['_id'], updateData: IUserInput): Promise<TReturnDocumentOrNull> => {
    if (updateData.password !== undefined) {
      const hashPassword = bcrypt.hashPassword(updateData.password);
      return User.findByIdAndUpdate(userId, { ...updateData, password: hashPassword }, { new: true });
    }

    return User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  getAllUsersPagination: async (query: TReqGetUsers['query']): Promise<IGetUsersReturn> => {
    const { page = 1, perPage = 5, ...filterQuery } = query;
    const skip = (page - 1) * perPage;

    const search = userUtil.buildFilterQuery(filterQuery);

    const users = await User.find(search).limit(perPage).skip(skip);

    const count = await User.count(search);

    return {
      dataUsers: users,
      page: page,
      perPage: perPage,
      total: count
    };
  }
};
