const { checkUser } = require('../../server/commonMiddleware/common.middleware');
const userService = require('../../server/api/user/user.service');

jest.mock('../../server/api/user/user.service', () => ({
  getUserByID: jest.fn((arg) => arg)
}));
describe('checkUser', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      locals: {},
      params: {
        userId: 'fake_userID'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should add at req.locals finded user and call next  if user with the given ID was find', async () => {
    await checkUser(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(req.locals).toEqual({ user: req.params.userId });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should respond with an error message if user is not defined', async () => {
    req.params.userId = null;
    await checkUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: `User with id ${req.params.userId} is not defined` });
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw error if enexpected error', async () => {
    const error = new Error('enexpected error');
    userService.getUserByID.mockImplementationOnce(() => {
      throw error;
    });
    await expect(checkUser(req, res, next)).rejects.toThrow('Error: enexpected error');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
