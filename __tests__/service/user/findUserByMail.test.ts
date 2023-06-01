import User from '../../../src/data-base/user';
import userService from '../../../src/api/user/user.service';

import { IUserInput } from '../../../src/types/data-base/types';

jest.mock('../../../src/data-base/user');

describe('find single user by email', () => {
  let email: IUserInput['email'];
  beforeEach(() => {
    email = 'fake_email';
  });
  it('should user was find', async () => {
    User.findOne = jest.fn().mockResolvedValueOnce(true);

    const result = await userService.findByEmail(email);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(result).toBe(true);
  });

  it('should user wasn`t find', async () => {
    User.findOne = jest.fn().mockResolvedValueOnce(false);

    const result = await userService.findByEmail(email);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(result).toBe(false);
  });

  it('throw error if something went  wrong', async () => {
    const error = new Error('something went  wrong');
    User.findOne = jest.fn().mockRejectedValueOnce(error);

    await expect(userService.findByEmail(email)).rejects.toThrow(error);
    expect(User.findOne).toHaveBeenCalledWith({ email });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
