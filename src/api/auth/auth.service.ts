import { FilterQuery } from 'mongoose';

import OAuth from '../../data-base/OAuth';
import { IOauthDocument, IOauthInput } from '../../types/data-base/types';
import { IDeleteTokenArg } from '../../types/apiRestGraphQl/auth/types';

export default {
  createOauthPair: (tokenData: IOauthInput): Promise<IOauthDocument> => OAuth.create(tokenData),

  deleteByParams: (deleteData: FilterQuery<IDeleteTokenArg>) => OAuth.deleteMany(deleteData)
};
