import { NextFunction } from 'express';

import oauthService from '../../services/oauth.service';
import service from './auth.service';
import { TReqLoginUser, TReqLogoutUser, TResLocalsUser, TResLocalsValideteToken } from "../../types/apiRestGraphQl/auth/types";


export default {
  loginUser: async (req: TReqLoginUser, res: TResLocalsUser, next: NextFunction) => {
    try {
      const { user } = res.locals;

      await oauthService.checkPasswords(user.password, req.body.password);
      const tokenPair = oauthService.generateAccessTokenPair({ user: user._id });

      await service.createOauthPair({ ...tokenPair, user: user._id });

      res.json({
        ...tokenPair,
        user
      });
    } catch (e: any) {
      throw new Error(e);
    }
  },

  logoutUser: async (req: TReqLogoutUser, res: TResLocalsValideteToken, next: NextFunction) => {
    try {
      const { accessToken } = res.locals;

      await service.deleteByParams({ accessToken });

      res.json('token was delete');
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
