/* eslint-disable import/no-unresolved */
// import  {DocumentDefinition}  from 'mongoose';
import User, { UserDocument, UserInput } from '../../data-base/user';
import bcrypt from '../../services/oauth.service';
import userUtil from './user.util';
import { TypeCheckUserDublicate } from './user.middleware';
export type TypeUserDocumentOrUndefinedOrNull = UserDocument | undefined | null;
type TypeGetAllUsersPaginationReturn = {
  dataUsers: UserDocument[];
  page: number;
  perPage: number;
  total: number;
};
export default {
  findByEmail: (email: UserInput['email']): Promise<TypeUserDocumentOrUndefinedOrNull> => User.findOne({ email }),

  createdUser: async (userObject: UserInput): Promise<UserDocument> => {
    const hashPassword = await bcrypt.hashPassword(userObject.password);

    return User.create({ ...userObject, password: hashPassword });
  },

  deleteUserByID: (userId: UserDocument['_id']): Promise<TypeUserDocumentOrUndefinedOrNull> => User.findByIdAndUpdate(userId, { $set: { is_deleted: true } }),

  getUserByID: (userId: UserDocument['_id']): Promise<TypeUserDocumentOrUndefinedOrNull> => User.findById(userId),

  updateUserByID: (userId: UserDocument['_id'], updateData: UserInput): Promise<TypeUserDocumentOrUndefinedOrNull> => {
    if (updateData.password !== undefined) {
      const hashPassword = bcrypt.hashPassword(updateData.password);
      return User.findByIdAndUpdate(userId, { ...updateData, password: hashPassword }, { new: true });
    }

    return User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  getAllUsersPagination: async (query: TypeCheckUserDublicate['query']): Promise<TypeGetAllUsersPaginationReturn> => {
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
