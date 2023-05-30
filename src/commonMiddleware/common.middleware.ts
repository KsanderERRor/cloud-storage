import {NextFunction} from 'express';

import userService from '../api/user/user.service';
import {TReqCorrectUser,TResCorrectUserLocal} from '../types/apiRestGraphQl/commonMiddleware/types';


export default {
  checkUser: async (req: TReqCorrectUser, res: TResCorrectUserLocal, next: NextFunction): Promise<void> => {
    try {
      const user = await userService.getUserByID(req.params.userId);

      if (!user) {
        res.status(404).json({ error: true, message: `User with id ${req.params.userId} is not defined` });
        return;
      }

      res.locals = { ...res.locals, user };

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  userIsNotDeleted: (req: TReqCorrectUser, res: TResCorrectUserLocal, next: NextFunction): void => {
    try {
      if (res.locals.user.is_deleted === false) {
        next();
      } else {
        res.status(404).json({ error: true, message: 'user not found' });
        return;
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
