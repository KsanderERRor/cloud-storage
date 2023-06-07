import { NextFunction } from 'express';
import userMdlwr from '../../../src/api/user/user.middleware';

import ValidSchema from '../../../src/api/user/user.validator';

import { TReqCorrectUser, TResCorrectUserLocal } from '../../../src/types/apiRestGraphQl/commonMiddleware/types';
describe('check user if  sends valid update-data  middleware', () => {
  let req: TReqCorrectUser;
  let res: TResCorrectUserLocal;
  let next: NextFunction;
  let spyForValidate;
  beforeEach(() => {
    req = {
      body: {
        email: 'example@example.com',
        password: 'FakePassword123',
        discSpace: 1,
        userSpace: 2,
        avatar: 'fakeAvatar',
        is_deleted: false
      }
    } as TReqCorrectUser;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as TResCorrectUserLocal;
    next = jest.fn();
    spyForValidate = jest.spyOn(ValidSchema.ValidUserUpdateSchema, 'validate');
  });

  it('should call next  if user sends valid data', () => {
    userMdlwr.UpdateUserValidator(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  // it('should call next  if user sends empty data',  () => {
  //   req.body = {};
  //   userMdlwr.UpdateUserValidator(req, res, next);

  //   expect(res.status).not.toHaveBeenCalled();
  //   expect(res.json).not.toHaveBeenCalled();
  //   expect(next).toHaveBeenCalled();
  //   expect(spyForValidate).toHaveBeenCalledWith(req.body);
  // });

  it('should respond with an error message if user sends invalid new email', () => {
    req.body.email = 'wrongEmail';
    userMdlwr.UpdateUserValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'new email is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid new password', () => {
    req.body.password = 'invalidpassword';
    userMdlwr.UpdateUserValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'new password is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid discSpace', () => {
    req.body.discSpace = 100001;
    userMdlwr.UpdateUserValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid userSpace', () => {
    req.body.userSpace = 100001;
    userMdlwr.UpdateUserValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  // it('should respond with an error message if user sends invalid type of avatar',  () => {
  //   req.body.avatar = true;
  //   userMdlwr.UpdateUserValidator(req, res, next);

  //   expect(res.status).toHaveBeenCalledWith(422);
  //   expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is not falid of type' });
  //   expect(next).not.toHaveBeenCalled();
  //   expect(spyForValidate).toHaveBeenCalledWith(req.body);
  // });

  it('should respond with an error message if user sends invalid type of is_deleted', () => {
    req.body.is_deleted = true;
    userMdlwr.UpdateUserValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'you need delete user at delete endpoint' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
