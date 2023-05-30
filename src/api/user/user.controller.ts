import userService from './user.service';
import { Response, NextFunction } from 'express';

import {TReqRegistration,TReqGetUsers} from '../../types/apiRestGraphQl/user/types';
import { TResCorrectUserLocal, TReqCorrectUser } from '../../types/apiRestGraphQl/commonMiddleware/types'

export default {
  createUser: async (req: TReqRegistration, res: Response, next: NextFunction) => {
    try {
      const createdUser = await userService.createdUser(req.body);

      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  getAllUsersPagination: async (req: TReqGetUsers, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsersPagination(req.query);

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req: TReqCorrectUser, res: TResCorrectUserLocal, next: NextFunction): Promise<void> => {
    try {
      await userService.deleteUserByID(req.params.userId);

      res.json(`user was delete`);
    } catch (e) {
      next(e);
    }
  },

  getOneUserByID: async (req: TReqCorrectUser, res: TResCorrectUserLocal, next: NextFunction) => {
    try {
      const user = await userService.getUserByID(req.params.userId);

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  updateOneUserByID: async (req:TReqCorrectUser, res:TResCorrectUserLocal, next:NextFunction) => {
    try {
      await userService.updateUserByID(req.params.userId, req.body);

      res.json('user was update');
    } catch (e) {
      next(e);
    }
  }
};
