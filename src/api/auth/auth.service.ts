import { FilterQuery } from 'mongoose';
import OAuth, { IOauthDocument, IOauthInput } from '../../data-base/OAuth';
type TDeleteTokinArg = {
  accessToken: IOauthDocument['accessToken'];
};
export default {
  createOauthPair: (tokenData: IOauthInput): Promise<IOauthDocument> => OAuth.create(tokenData),

  // / im not shure about type for deleteData and type return
  deleteByParams: (deleteData: FilterQuery<TDeleteTokinArg>) => OAuth.deleteMany(deleteData)
};
