import { FilterQuery } from 'mongoose';

import OAuth from '../../data-base/OAuth';
import { IOauthDocument, IOauthInput } from '../../types/data-base/types';
import { IDeleteTokenArg, IDeleteResult } from '../../types/apiRestGraphQl/auth/types';

export default {
  createOauthPair: (tokenData: IOauthInput): Promise<IOauthDocument> => OAuth.create(tokenData),

  deleteByParams: (deleteData: FilterQuery<IDeleteTokenArg>): Promise<IDeleteResult> => OAuth.deleteMany(deleteData)
};
