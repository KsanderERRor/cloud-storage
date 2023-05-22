const { QueryPaginationValidator } = require('../../../server/api/user/user.middleware');

const { ValidQuerySchema } = require('../../../server/api/user/user.validator');

describe('check user if  sends valid query-data  middleware', () => {
  let req;
  let res;
  let next;
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
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    spyForValidate = jest.spyOn(ValidQuerySchema, 'validate');
  });

  it('should call next  if user sends valid query', async () => {
    await QueryPaginationValidator(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should call next  if user sends empty query', async () => {
    req.query = {};
    await QueryPaginationValidator(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends invalid page', async () => {
    req.query.page = 100001;
    await QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends invalid perPage', async () => {
    req.query.perPage = 100001;
    await QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends invalid email', async () => {
    req.query.email = 'wrongEmail';
    await QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'email is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends invalid discSpace_gte', async () => {
    req.query.discSpace_gte = 100001;
    await QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends discSpace_lte', async () => {
    req.query.discSpace_lte = 100001;
    await QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends userSpace_gte', async () => {
    req.query.userSpace_gte = 100001;
    await QueryPaginationValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.query);
  });

  it('should respond with an error message if user sends userSpace_lte', async () => {
    req.query.userSpace_lte = 100001;
    await QueryPaginationValidator(req, res, next);

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

    expect(() => QueryPaginationValidator(req, res, next)).toThrow();

    expect(next).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
