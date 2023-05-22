const { createdUser } = require('../../../server/api/user/user.service');
const User = require('../../../server/data-base/user');
const { hashPassword } = require('../../../server/services/oauth.service');

jest.mock('../../../server/data-base/user', () => ({
  create: jest.fn((arg) => arg)
}));
jest.mock('../../../server/services/oauth.service', () => ({
  hashPassword: jest.fn(() => 'hashedPassword')
}));

describe('create user', () => {
  it('should return correct user', async () => {
    const userObject = {
      email: 'fake_email',
      password: 'fake_password'
    };

    const result = await createdUser(userObject);

    expect(hashPassword).toHaveBeenCalledWith('fake_password');
    expect(hashPassword).toHaveBeenCalledTimes(1);

    expect(User.create).toHaveBeenCalledWith({ ...userObject, password: 'hashedPassword' });
    expect(User.create).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual({ email: 'fake_email', password: 'hashedPassword' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
