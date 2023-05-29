import { Request, Response, NextFunction } from 'express';
import userService from './user.service';
import validateSchema from './user.validator';
import { TReqCorrectUser, TResLocalCorrectUser } from '../../commonMiddleware/common.middleware';

interface RequestQuery {
  page?: number;
  perPage?: number;
  email?: string;
  userSpace_gte?: number;
  userSpace_lte?: number;
  discSpace_gte?: number;
  discSpace_lte?: number;
}
interface RequestBodyCreateAndUpdate {
  email: string;
  password: string;
  discSpace: number;
  userSpace: number;
  is_deleted: boolean;
  avatar: string;
}

export type TypeCheckUserDublicate = Request<any, any, RequestBodyCreateAndUpdate, RequestQuery>;
export default {
  checkUserDyplicates: async (req: TypeCheckUserDublicate, res: Response, next: NextFunction): Promise<void> => {
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

  userValidator: (req: TypeCheckUserDublicate, res: Response, next: NextFunction): void => {
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

  QueryPaginationValidator: (req: Request<any, RequestQuery>, res: Response, next: NextFunction): void => {
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

  UpdateUserValidator: (req: TReqCorrectUser, res: TResLocalCorrectUser, next: NextFunction): void => {
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
