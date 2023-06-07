import { Request } from 'express';

import { IFileDocument, IFileInput } from '../../data-base/types';

// ///////////////////////////////////////////////////////////////////////file/////////////////////////////

// //// req for upload file
export type TReqUpload = Request<any, any, IReqBody>;
interface IReqBody {
  user: IFileInput['user'];
}

// //// req for getALLFile pagination&sort&filter
export type TReqGetFile = Request<any, any, any, IReqQueryParams>;
export interface IReqQueryParams {
  page?: number;
  perPage?: number;
  name?: string;
  size_gte?: number;
  size_lte?: number;
  date_gte?: Date;
  date_lte?: Date;
  user?: IFileInput['user'];
}

// //// util interfaces
export interface IQuery {
  name?: string;
  size_gte?: number;
  size_lte?: number;
  date_gte?: Date;
  date_lte?: Date;
  user?: IFileInput['user'];
}

export interface ISizeFilter {
  $gte?: number;
  $lte?: number;
}

export interface IDataFilter {
  $gte?: Date;
  $lte?: Date;
}

export interface IfilterQuery {
  name?: IQuery['name'];
  user?: IQuery['user'];
  size?: ISizeFilter;
  createdAt?: IDataFilter;
}

// //// file service return interface
export interface IReturnFiles {
  data: IFileDocument[];
  page: IReqQueryParams['page'];
  perPage: IReqQueryParams['perPage'];
  total: number;
}

export { IFileDocument };
