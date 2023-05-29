import { Request, Response, NextFunction } from 'express';
import userService from '../user/user.service';
import oauthService from '../../services/oauth.service';
import { UserDocument } from '../../data-base/user';
import { JwtPayload } from 'jsonwebtoken';
import { TypeUserDocumentOrUndefinedOrNull } from '../user/user.service';

interface ILoginBody {
  email: string;
  password: string;
}
export type TReqLoginUser = Request<any, any, ILoginBody, any>;
interface ILocalsUser extends Record<string, any> {
  user: UserDocument;
}
export type TResLocals = Response<any, ILocalsUser>;

export type TReqLogoutUser = Request;
interface ILocalsValidateToken extends Record<string, any> {
  decodetToken: string | JwtPayload;
  accessToken: string;
}
export type TResLocalsValideteToken = Response<any, ILocalsValidateToken>;

export default {
  checkUserWasAlreadyCreate: async (req: TReqLoginUser, res: TResLocals, next: NextFunction): Promise<void> => {
    try {
      const user: TypeUserDocumentOrUndefinedOrNull = await userService.findByEmail(req.body.email);

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
