const User = require('../../../server/data-base/user');
const { findByEmail } = require('../../../server/api/user/user.service');

jest.mock('../../../server/data-base/user');

describe('find single user by email', () => {
  let email;
  beforeEach(() => {
    email = 'fake_email';
  });
  it('should user was find', async () => {
    User.findOne.mockResolvedValueOnce(true);

    const result = await findByEmail(email);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(result).toBe(true);
  });

  it('should user wasn`t find', async () => {
    User.findOne.mockResolvedValueOnce(false);

    const result = await findByEmail(email);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(result).toBe(false);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
