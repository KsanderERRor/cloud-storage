import { NextFunction } from 'express';
import { Types } from 'mongoose';

import User from '../../../src/data-base/user';
import userMdlwr from '../../../src/api/auth/auth.middleware';
import userService from '../../../src/api/user/user.service';

import { TReqLoginUser, TResLocalsUser } from '../../../src/types/apiRestGraphQl/auth/types';
import { IUserDocument } from '../../../src/types/data-base/types';

jest.mock('../../../src/api/user/user.service');

describe('checkUserWasAlreadyCreate', () => {
  let req: TReqLoginUser;
  let res: TResLocalsUser;
  let next: NextFunction;
  let userDB: IUserDocument;
  beforeEach(() => {
    req = {
      body: {
        email: 'fake_email',
        password: 'fake_password'
      }
    } as TReqLoginUser;
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {}
    } as unknown as TResLocalsUser;
    userDB = new User({
      _id: new Types.ObjectId(),
      email: 'fake_email',
      password: 'fake_password',
      discSpace: 2,
      userSpace: 3,
      avatar: 'fake_avatar',
      is_deleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });

  it('should respond with an error message if user with the given email wasnt find', async () => {
    (userService.findByEmail as jest.Mock).mockImplementationOnce(() => null);

    await userMdlwr.checkUserWasAlreadyCreate(req, res, next);

    expect(userService.findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: `User with  email ${req.body.email} not found` });
    expect(next).not.toHaveBeenCalled();
  });

  it('should add at req.locals finded user and call next  if user with the given email was find', async () => {
    (userService.findByEmail as jest.Mock).mockImplementationOnce(() => userDB);

    (next as jest.Mock).mockResolvedValue(res.locals);

    await userMdlwr.checkUserWasAlreadyCreate(req, res, next);

    expect(res.locals).toEqual({ user: userDB });
    expect(userService.findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should throw error if enexpected error', async () => {
    (userService.findByEmail as jest.Mock).mockRejectedValue(new Error('Some error'));

    await expect(userMdlwr.checkUserWasAlreadyCreate(req, res, next)).rejects.toThrow();
    expect(userService.findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
