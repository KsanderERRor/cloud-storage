const { checkUserDyplicates } = require('../../../server/api/user/user.middleware');
const { findByEmail } = require('../../../server/api/user/user.service');

jest.mock('../../../server/api/user/user.service');

describe('check if the user has dyplicates middleware', () => {
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

  it('should respond with an error message if user with the given email already exists', async () => {
    findByEmail.mockImplementationOnce(() => userDB);

    await checkUserDyplicates(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: `User with  email ${req.body.email} already exists` });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next  if user with the given email does not exist', async () => {
    findByEmail.mockImplementationOnce(() => null);

    await checkUserDyplicates(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should throw error if enexpected error', async () => {
    findByEmail.mockRejectedValue(new Error('Some error'));

    await expect(checkUserDyplicates(req, res, next)).rejects.toThrow('Error');
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
