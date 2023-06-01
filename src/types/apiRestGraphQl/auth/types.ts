import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { IUserDocument, IOauthDocument } from '../../data-base/types';

// ///////////////////////////////////////////////////////////////////////oaut/////////////////////////////

// ////Req for checkUserWasAlreadyCreate middleware & login endpoint
export type TReqLoginUser = Request<any, any, ILoginBody, any>;
export interface ILoginBody {
  email: string;
  password: string;
}

// ////Res for validateAccessToken middleware  & logout endpoint
export type TResLocalsUser = Response<any, ILocalsUser>;
interface ILocalsUser extends Record<string, any> {
  user: IUserDocument;
}

// ////Req for checkUserWasAlreadyCreate middleware
export type TReqLogoutUser = Request;

// ////Res for validateAccessToken middleware  & logout endpoint
export type TResLocalsValideteToken = Response<any, ILocalsValidateToken>;
interface ILocalsValidateToken extends Record<string, any> {
  decodetToken: string | JwtPayload;
  accessToken: string;
}

// ////Arg for oauth service deleteByParams
export interface IDeleteTokenArg {
  accessToken: IOauthDocument['accessToken'];
}
