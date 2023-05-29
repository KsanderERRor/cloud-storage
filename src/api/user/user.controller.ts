import userService from './user.service';
import { Request, Response, NextFunction } from 'express';

import { TypeCheckUserDublicate } from './user.middleware';
import { TReqCorrectUser, TResLocalCorrectUser } from '../../commonMiddleware/common.middleware';

export default {
  createUser: async (req: TypeCheckUserDublicate, res: Response, next: NextFunction) => {
    try {
      const createdUser = await userService.createdUser(req.body);

      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  getAllUsersPagination: async (req: TypeCheckUserDublicate, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsersPagination(req.query);

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req: TReqCorrectUser, res: TResLocalCorrectUser, next: NextFunction): Promise<void> => {
    try {
      await userService.deleteUserByID(req.params.userId);

      res.json(`user was delete`);
    } catch (e) {
      next(e);
    }
  },

  getOneUserByID: async (req: TReqCorrectUser, res: TResLocalCorrectUser, next: NextFunction) => {
    try {
      const user = await userService.getUserByID(req.params.userId);

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  updateOneUserByID: async (req, res, next) => {
    try {
      await userService.updateUserByID(req.params.userId, req.body);

      res.json('user was update');
    } catch (e) {
      next(e);
    }
  }
};
