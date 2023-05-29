/* eslint-disable consistent-return */
import { Types } from 'mongoose';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import userService from '../api/user/user.service';
import { UserDocument, UserInput } from '../../src/data-base/user';

interface ResponseBody {}
interface RequestBody {}
interface RequestQuery {}
interface IParamsUserId {
  userId: Types.ObjectId;
}
export type IReqLocalUserAndReqParamsUserId = Request<IParamsUserId, ResponseBody, RequestBody, RequestQuery, Record<string, any>> & {
  locals: {
    user: UserDocument;
  };
};

export default {
  checkUser: async (req: IReqLocalUserAndReqParamsUserId, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await userService.getUserByID(req.params.userId);

      if (!user) {
        res.status(404).json({ error: true, message: `User with id ${req.params.userId} is not defined` });
        return;
      }

      req.locals = { ...req.locals, user };

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  userIsNotDeleted: (req: IReqLocalUserAndReqParamsUserId, res: Response, next: NextFunction) => {
    try {
      if (req.locals.user.is_deleted === false) {
        next();
      } else {
        return res.status(404).json({ error: true, message: 'user not found' });
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
