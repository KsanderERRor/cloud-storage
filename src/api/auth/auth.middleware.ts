import { NextFunction } from 'express';
import userService from '../user/user.service';
import oauthService from '../../services/oauth.service';
import { TReqLoginUser,TReqLogoutUser,TResLocalsUser,TResLocalsValideteToken } from "../../types/apiRestGraphQl/auth/types";



export default {
  checkUserWasAlreadyCreate: async (req: TReqLoginUser, res: TResLocalsUser, next: NextFunction): Promise<void> => {
    try {
      const user = await userService.findByEmail(req.body.email);

      if (!user) {
        res.status(400).json({ message: `User with  email ${req.body.email} not found` });
        return;
      }

      res.locals = { ...res.locals, user };

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  validateAccessToken: (req: TReqLogoutUser, res: TResLocalsValideteToken, next: NextFunction): void => {
    try {
      const accessToken: string | undefined = req.get('Authorization');

      if (!accessToken) {
        res.status(400).json({ message: 'token is not found' });
        return;
      }

      const decodedToken = oauthService.validateAccessToken(accessToken);

      if (!decodedToken) {
        res.status(400).json({ message: 'token isn`t verified' });
        return;
      }

      res.locals = { ...res.locals, accessToken, decodedToken };

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
