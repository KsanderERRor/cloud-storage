import { Response, NextFunction } from 'express';

import userService from './user.service';
import validateSchema from './user.validator';

import { TReqRegistration, TReqGetUsers } from '../../types/apiRestGraphQl/user/types'
import { TResCorrectUserLocal, TReqCorrectUser } from '../../types/apiRestGraphQl/commonMiddleware/types'

export default {
  checkUserDyplicates: async (req: TReqRegistration, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await userService.findByEmail(req.body.email);

      if (user) {
        res.status(400).json({ message: `User with  email ${user.email} already exists` });
        return;
      }

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  userValidator: (req: TReqRegistration, res: Response, next: NextFunction): void => {
    try {
      const { error } = validateSchema.ValidUserSchema.validate(req.body);

      if (error) {
        res.status(422).json({ error: true, message: `${error.message}` });
        return;
      }

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  QueryPaginationValidator: (req: TReqGetUsers, res: Response, next: NextFunction): void => {
    try {
      const { error } = validateSchema.ValidQuerySchema.validate(req.query);

      if (error) {
        res.status(422).json({ error: true, message: `${error.message}` });
        return;
      }

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  UpdateUserValidator: (req: TReqCorrectUser, res: TResCorrectUserLocal, next: NextFunction): void => {
    try {
      const { error } = validateSchema.ValidUserUpdateSchema.validate(req.body);

      if (error) {
        res.status(422).json({ error: true, message: `${error.message}` });
        return;
      }

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
