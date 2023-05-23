const { userIsNotDeleted } = require('../../server/commonMiddleware/common.middleware');

describe('userIsNotDeleted', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      locals: {
        user: {
          is_deleted: true
        }
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });
  it('should respond with an error message if user field is_delete equals to true', () => {
    userIsNotDeleted(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'user not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user field is_delete equals to false', () => {
    req.locals.user.is_deleted = false;

    userIsNotDeleted(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should throw error if something is wrong', async () => {
    const error = new Error('something is wrong');
    res.json.mockImplementationOnce(() => {
      throw error;
    });

    expect(() => userIsNotDeleted(req, res, next)).toThrow('Error: something is wrong');

    expect(next).not.toHaveBeenCalled();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
