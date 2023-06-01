import { Request, Response } from 'express';
import { IUserDocument } from '../../data-base/types';

// ///////////////////////////////////////////////////////////////////////commonMiddleware/////////////////////////////

// ////Req for all //:userId endpoints
export type TReqCorrectUser = Request<IParamsUserId, any, TUpdateBady>;
type TUpdateBady = IUserDocument;
interface IParamsUserId {
  userId: IUserDocument['_id'];
}

// ////Res for all //:userId endpoints
export type TResCorrectUserLocal = Response<any, ILocal>;
interface ILocal extends Record<string, any> {
  user: IUserDocument;
}
