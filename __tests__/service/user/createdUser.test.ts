import userService from '../../../src/api/user/user.service';

import bcrypt from '../../../src/services/oauth.service';
import User from '../../../src/data-base/user';

import { IUserInput } from '../../../src/types/data-base/types';

jest.mock('../../../src/data-base/user', () => ({
  create: jest.fn((arg: IUserInput): IUserInput => arg)
}));
jest.mock('../../../src/services/oauth.service', () => ({
  hashPassword: jest.fn((arg: IUserInput['password']): string => 'hashedPassword')
}));

describe('create user', () => {
  it('should return correct user', async () => {
    const userObject: IUserInput = {
      email: 'fake_email',
      password: 'fake_password',
      discSpace: 1,
      userSpace: 2,
      is_deleted: false,
      avatar: 'fake_avatar'
    };

    const result = await userService.createdUser(userObject);

    expect(bcrypt.hashPassword).toHaveBeenCalledWith('fake_password');
    expect(bcrypt.hashPassword).toHaveBeenCalledTimes(1);

    expect(User.create).toHaveBeenCalledWith({ ...userObject, password: 'hashedPassword' });
    expect(User.create).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual({ ...userObject, password: 'hashedPassword' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
