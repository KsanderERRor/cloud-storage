import { Response, NextFunction } from 'express';

import userMdlwe from '../../../src/api/user/user.middleware';
import validateSchema from '../../../src/api/user/user.validator';

import { TReqRegistration } from '../../../src/types/apiRestGraphQl/user/types';

describe('userValidator', () => {
  let req: TReqRegistration;
  let res: Response;
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
    } as TReqRegistration;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    next = jest.fn();
    spyForValidate = jest.spyOn(validateSchema.ValidUserSchema, 'validate');
  });

  it('should call next  if user sends valid query', async () => {
    userMdlwe.userValidator(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  // it('should respond with an error message if user sends empty query', async () => {
  //   req.body = {};
  //    userMdlwe.userValidator(req, res, next);

  //   expect(res.status).toHaveBeenCalledWith(422);
  //   expect(res.json).toHaveBeenCalledWith({ error: true, message: 'email is not valid' });
  //   expect(next).not.toHaveBeenCalled();
  //   expect(spyForValidate).toHaveBeenCalledWith(req.body);
  // });

  it('should respond with an error message if user sends invalid new email', async () => {
    req.body.email = 'wrongEmail';
    userMdlwe.userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'email is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid new password', async () => {
    req.body.password = 'invalidpassword';
    userMdlwe.userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'password is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid discSpace', async () => {
    req.body.discSpace = 100001;
    userMdlwe.userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid userSpace', async () => {
    req.body.userSpace = 100001;
    userMdlwe.userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  // it('should respond with an error message if user sends invalid type of avatar', async () => {
  //   req.body.avatar = null;
  //    userMdlwe.userValidator(req, res, next);

  //   expect(res.status).toHaveBeenCalledWith(422);
  //   expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is not falid of type' });
  //   expect(next).not.toHaveBeenCalled();
  //   expect(spyForValidate).toHaveBeenCalledWith(req.body);
  // });

  it('should respond with an error message if user sends invalid type of is_deleted', async () => {
    req.body.is_deleted = true;
    userMdlwe.userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is not falid of type' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
