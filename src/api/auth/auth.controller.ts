import oauthService from '../../services/oauth.service';
import service from './auth.service';
import { Response } from 'express';
import { IReqLoginUser, IReqLogoutUser } from './auth.middleware';
export default {
  loginUser: async (req: IReqLoginUser, res) => {
    try {
      const { user } = req.locals;

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

  logoutUser: async (req: IReqLogoutUser, res) => {
    try {
      const accessToken = req.get('Authorization');
      if (!accessToken) {
        throw new Error('token wasn`t defined');
      }
      await service.deleteByParams({ accessToken });

      res.json('token was delete');
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
