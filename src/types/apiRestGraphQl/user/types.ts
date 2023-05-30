import { Request, Response } from 'express'
import { IUserDocument, IUserInput } from "../../data-base/types";

// ///////////////////////////////////////////////////////////////////////user/////////////////////////////


// //// Req for user middlewareQueryPaginationValidator &  getALlUserPagination endpoint
export type TReqGetUsers = Request<any, any, any, IRequestQuery>
interface IRequestQuery {
  page?: number;
  perPage?: number;
  email?: string;
  userSpace_gte?: number;
  userSpace_lte?: number;
  discSpace_gte?: number;
  discSpace_lte?: number;
}



// //// Req for user middleware, create & update endpoint
export type TReqRegistration = Request<any, any, IRequestBodyCreateAndUpdate, any>;
interface IRequestBodyCreateAndUpdate {
  email: string;
  password: string;
  discSpace: number;
  userSpace: number;
  is_deleted: boolean;
  avatar: string;
}


// /// User util interfaces 
export interface IQuery {
  email?: string | undefined;
  userSpace_gte?: number | undefined;
  userSpace_lte?: number | undefined;
  discSpace_gte?: number | undefined;
  discSpace_lte?: number | undefined;
}

export interface IDiscSpaceFilter {
  $gte?: number;
  $lte?: number;
};
export interface IUserSpaceFilter {
  $gte?: number;
  $lte?: number;
};
export interface IFilterQuery {
  email?: string;
  discSpace?: IDiscSpaceFilter;
  userSpace?: IUserSpaceFilter;
};


// ////User service return  interfaces and type 
export type TReturnDocumentOrNull = IUserDocument | null;

export interface IGetUsersReturn {
  dataUsers: IUserDocument[];
  page: number;
  perPage: number;
  total: number;
};
