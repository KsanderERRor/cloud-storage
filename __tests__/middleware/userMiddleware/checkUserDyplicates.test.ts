import { Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import User from '../../../src/data-base/user';
import userMdlwe from '../../../src/api/user/user.middleware';
import userService from '../../../src/api/user/user.service';

import { IUserDocument } from '../../../src/types/data-base/types';
import { TReqRegistration } from '../../../src/types/apiRestGraphQl/user/types';

jest.mock('../../../src/api/user/user.service');

describe('check if the user has dyplicates middleware', () => {
  let req: TReqRegistration;
  let res: Response;
  let next: NextFunction;
  let userDB: IUserDocument;
  beforeEach(() => {
    req = {
      body: {
        email: 'fake_email',
        password: 'fake_password'
      }
    } as TReqRegistration;
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    userDB = new User({
      _id: new Types.ObjectId(),
      email: 'fake_email',
      password: 'fake_password',
      discSpace: 2,
      userSpace: 3,
      avatar: 'fake_avatar',
      is_deleted: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });

  it('should respond with an error message if user with the given email already exists', async () => {
    (userService.findByEmail as jest.Mock).mockImplementationOnce(() => userDB);

    await userMdlwe.checkUserDyplicates(req, res, next);

    expect(userService.findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: `User with  email ${req.body.email} already exists` });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next  if user with the given email does not exist', async () => {
    (userService.findByEmail as jest.Mock).mockImplementationOnce(() => null);

    await userMdlwe.checkUserDyplicates(req, res, next);

    expect(userService.findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should throw error if enexpected error', async () => {
    (userService.findByEmail as jest.Mock).mockRejectedValue(new Error('Some error'));

    await expect(userMdlwe.checkUserDyplicates(req, res, next)).rejects.toThrow('Error');

    expect(userService.findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
