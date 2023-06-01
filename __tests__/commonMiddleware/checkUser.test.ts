import { NextFunction } from 'express';
import { Types } from 'mongoose';

import commonMdlw from '../../src/commonMiddleware/common.middleware';
import userService from '../../src/api/user/user.service';

import { TReqCorrectUser, TResCorrectUserLocal } from '../../src/types/apiRestGraphQl/commonMiddleware/types';

jest.mock('../../src/api/user/user.service', () => ({
  getUserByID: jest.fn((arg) => arg)
}));

describe('checkUser', () => {
  let req: TReqCorrectUser;
  let res: TResCorrectUserLocal;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: {
        userId: new Types.ObjectId()
      }
    } as TReqCorrectUser;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {}
    } as unknown as TResCorrectUserLocal;
    next = jest.fn();
  });

  it('should add at req.locals finded user and call next  if user with the given ID was find', async () => {
    await commonMdlw.checkUser(req, res, next);

    expect(userService.getUserByID).toHaveBeenCalledWith(req.params.userId);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.locals).toEqual({ user: req.params.userId });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should respond with an error message if user is not defined', async () => {
    // req.params.userId = null;

    await commonMdlw.checkUser(req, res, next);

    expect(userService.getUserByID).toHaveBeenCalledWith(req.params.userId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: `User with id ${req.params.userId} is not defined` });
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw error if enexpected error', async () => {
    const error = new Error('enexpected error');

    (userService.getUserByID as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    await expect(commonMdlw.checkUser(req, res, next)).rejects.toThrow('Error: enexpected error');

    expect(userService.getUserByID).toHaveBeenCalledWith(req.params.userId);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
