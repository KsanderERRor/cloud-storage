const { checkUserWasAlreadyCreate } = require('../../../server/api/auth/auth.middleware');
const { findByEmail } = require('../../../server/api/user/user.service');

jest.mock('../../../server/api/user/user.service');

describe('checkUserWasAlreadyCreate', () => {
  let req;
  let res;
  let next;
  let userDB;
  beforeEach(() => {
    req = { body: { email: 'fake_email' } };
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    userDB = {
      email: 'fake_email'
    };
  });

  it('should respond with an error message if user with the given email wasnt find', async () => {
    findByEmail.mockImplementationOnce(() => null);

    await checkUserWasAlreadyCreate(req, res, next);

    expect(findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: `User with  email ${req.body.email} not found` });
    expect(next).not.toHaveBeenCalled();
  });

  it('should add at req.locals finded user and call next  if user with the given email was find', async () => {
    findByEmail.mockImplementationOnce(() => userDB);

    next.mockResolvedValue(req.locals);

    await checkUserWasAlreadyCreate(req, res, next);

    expect(req.locals).toEqual({ user: { email: 'fake_email' } });
    expect(findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should throw error if enexpected error', async () => {
    findByEmail.mockRejectedValue(new Error('Some error'));

    await expect(checkUserWasAlreadyCreate(req, res, next)).rejects.toThrow();
    expect(findByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
