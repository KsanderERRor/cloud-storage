/* eslint-disable consistent-return */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import userService from '../user/user.service';
import oauthService from '../../services/oauth.service';
import { UserDocument } from '../../data-base/user';
import { JwtPayload } from 'jsonwebtoken';
import { TypeUserDocumentOrUndefinedOrNull } from '../user/user.service';

// interface ResponseBody {}
// interface RequestParams {}
// interface  RequestQuery {}

// interface RequestBody {
//   email: string
// }

interface ILoginBody {
  email: string;
  password: string;
}
export interface IReqLoginUser extends Request<any, any, ILoginBody> {
  locals: {
    user: UserDocument;
  };
}

export interface IReqLogoutUser extends Request {
  locals: {
    user: string | JwtPayload;
  };
}

export default {
  checkUserWasAlreadyCreate: async (req: IReqLoginUser, res: Response, next: NextFunction) => {
    try {
      const user: TypeUserDocumentOrUndefinedOrNull = await userService.findByEmail(req.body.email);
      console.log(user);

      if (!user) {
        return res.status(400).json({ message: `User with  email ${req.body.email} not found` });
      }

      req.locals = { ...req.locals, user };

      next();
    } catch (e: any) {
      throw new Error(e);
    }
  },

  validateAccessToken: (req: IReqLogoutUser, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.get('Authorization');

      if (!accessToken) {
        return res.status(400).json({ message: 'token is not found' });
      }

      const user = oauthService.validateAccessToken(accessToken);

      req.locals = { user };
      next();
    } catch (e: any) {
      throw new Error(e);
    }
  }
} as unknown as { [key: string]: RequestHandler };
