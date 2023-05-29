/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import userService from './user.service';
import validateSchema from './user.validator';
import { IReqLocalUserAndReqParamsUserId } from '../../commonMiddleware/common.middleware';
interface ResponseBody {}
interface RequestParams {}
interface RequestQuery {
  page?: number;
  perPage?: number;
  email?: string;
  userSpace_gte?: number;
  userSpace_lte?: number;
  discSpace_gte?: number;
  discSpace_lte?: number;
}

interface RequestBodyCreateAndUpdate {
  email: string;
  password: string;
  discSpace: number;
  userSpace: number;
  is_deleted: boolean;
  avatar: string;
}
// interface TReqUpdateUser extends IReqLocalUserAndReqParamsUserId {

// }
export type TypeCheckUserDublicate = Request<RequestParams, ResponseBody, RequestBodyCreateAndUpdate, RequestQuery>;
export default {
  checkUserDyplicates: async (req: TypeCheckUserDublicate, res: Response, next: NextFunction) => {
    try {
      const user = await userService.findByEmail(req.body.email);

      if (user) {
        return res.status(400).json({ message: `User with  email ${user.email} already exists` });
      }

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  userValidator: (req: TypeCheckUserDublicate, res: Response, next: NextFunction) => {
    try {
      const { error } = validateSchema.ValidUserSchema.validate(req.body);

      if (error) {
        return res.status(422).json({ error: true, message: `${error.message}` });
      }

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  QueryPaginationValidator: (req: Request<any, RequestQuery>, res: Response, next: NextFunction) => {
    try {
      const { error } = validateSchema.ValidQuerySchema.validate(req.query);

      if (error) {
        return res.status(422).json({ error: true, message: `${error.message}` });
      }

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  UpdateUserValidator: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validateSchema.ValidUserUpdateSchema.validate(req.body);

      if (error) {
        return res.status(422).json({ error: true, message: `${error.message}` });
      }

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
