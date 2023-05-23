const { updateUserByID } = require('../../../server/api/user/user.service');
const { hashPassword } = require('../../../server/services/oauth.service');
const User = require('../../../server/data-base/user');

jest.mock('../../../server/data-base/user');
jest.mock('../../../server/services/oauth.service');

describe('update user by id func', () => {
  let user;
  let newUser;
  let id;
  beforeEach(() => {
    user = {
      email: 'fake_email',
      password: undefined
    };
    newUser = {
      email: 'new_fake_email'
    };
    id = 'fake_id';
  });

  it('should return updated user obj (user doesnt change password)', async () => {
    User.findByIdAndUpdate.mockReturnValueOnce(newUser);

    const result = await updateUserByID(id, user);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, user, { new: true });

    expect(result).toEqual(newUser);
  });

  it('should return updated user obj (user change password)', async () => {
    User.findByIdAndUpdate.mockReturnValueOnce(newUser);

    hashPassword.mockImplementationOnce(() => 'hashedPassword');

    const result = await updateUserByID(id, { ...user, password: 'new_fake_password' });

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, { ...user, password: 'hashedPassword' }, { new: true });

    expect(result).toEqual(newUser);
  });

  it('should return error when something crashed', async () => {
    const error = new Error('unexpected error');

    User.findByIdAndUpdate.mockImplementationOnce(() => {
      throw error;
    });

    await expect(() => updateUserByID(id, user)).rejects.toThrow(error);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
