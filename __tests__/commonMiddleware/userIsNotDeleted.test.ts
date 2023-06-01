import { NextFunction } from 'express';
import User from '../../src/data-base/user';
import commonMdlwr from '../../src/commonMiddleware/common.middleware';

import { TReqCorrectUser, TResCorrectUserLocal } from '../../src/types/apiRestGraphQl/commonMiddleware/types';
import { Types } from 'mongoose';

describe('userIsNotDeleted', () => {
  let req: TReqCorrectUser;
  let res: TResCorrectUserLocal;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as TReqCorrectUser;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {
        user: new User({
          _id: new Types.ObjectId(),
          email: 'fake_email',
          password: 'fake_password',
          discSpace: 2,
          userSpace: 3,
          avatar: 'fake_avatar',
          is_deleted: true,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    } as unknown as TResCorrectUserLocal;
    next = jest.fn();
  });
  it('should respond with an error message if user field is_delete equals to true', () => {
    commonMdlwr.userIsNotDeleted(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'user not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user field is_delete equals to false', () => {
    res.locals.user.is_deleted = false;

    commonMdlwr.userIsNotDeleted(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should throw error if something is wrong', async () => {
    const error = new Error('something is wrong');
    (res.json as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    expect(() => commonMdlwr.userIsNotDeleted(req, res, next)).toThrow('Error: something is wrong');

    expect(next).not.toHaveBeenCalled();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
