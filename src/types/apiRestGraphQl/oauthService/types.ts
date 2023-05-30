import {IUserDocument} from '../../data-base/types'

// ///////////////////////////////////////////////////////////////////////oauth_services/////////////////////////////


// //// interface for services 
export interface IEncodeData {
    user: IUserDocument['_id'];
  };
  
export interface  IRetunGenerateTokenPair  {
    accessToken: string;
    refreshToken: string;
  };
  