import { Response, NextFunction } from 'express';
import userMdlwr from '../../../src/api/user/user.middleware';

import validateSchema from '../../../src/api/user/user.validator';

import { TReqGetUsers } from '../../../src/types/apiRestGraphQl/user/types';

describe('check user if  sends valid query-data  middleware', () => {
  let req: TReqGetUsers;
  let res: Response;
  let next: NextFunction;
  let spyForValidate;
  beforeEach(() => {
    req = {
      query: {
        page: 1,
        perPage: 5,
        discSpace_gte: 1,
        discSpace_lte: 1,
        userSpace_gte: 1,
        userSpace_lte: 1,
        email: 'example@example.com'
      }
    } as TReqGetUsers;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    next = jest.fn();
    spyForValidate = jest.spyOn(validateSchema.ValidQuerySchema, 'validate');
  });

  it('should call next  if user sends valid query', () => {
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should call next  if user sends empty query', () => {
    req.query = {};
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends invalid page', () => {
    req.query.page = 100001;
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends invalid perPage', () => {
    req.query.perPage = 100001;
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends invalid email', () => {
    req.query.email = 'wrongEmail';
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'email is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends invalid discSpace_gte', () => {
    req.query.discSpace_gte = 100001;
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends discSpace_lte', () => {
    req.query.discSpace_lte = 100001;
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends userSpace_gte', () => {
    req.query.userSpace_gte = 100001;
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends userSpace_lte', () => {
    req.query.userSpace_lte = 100001;
    userMdlwr.QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should throw error if something is wrong', async () => {
    const error = new Error('unexpected error');
    spyForValidate.mockImplementationOnce(() => {
      throw error;
    });

    expect(() => userMdlwr.QueryPaginationValidator(req, res, next)).toThrow();

    expect(next).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
