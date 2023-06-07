import { Types } from 'mongoose';

import userService from '../../../src/api/user/user.service';
import bcrypt from '../../../src/services/oauth.service';
import User from '../../../src/data-base/user';

import { IRequestBodyUpdate } from '../../../src/types/apiRestGraphQl/user/types';
import { IUserDocument } from '../../../src/types/data-base/types';

jest.mock('../../../src/data-base/user');
jest.mock('../../../src/services/oauth.service');

describe('update user by id func', () => {
  let updateData: IRequestBodyUpdate;

  let newUser: IUserDocument;
  let id: IUserDocument['_id'];
  beforeEach(() => {
    updateData = {
      email: 'fake_email',
      password: undefined
    };
    newUser = new User({
      _id: new Types.ObjectId(),
      email: 'fake_email',
      password: 'fake_password',
      diskSpace: 2,
      userSpace: 3,
      avatar: 'fake_avatar',
      is_deleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    id = new Types.ObjectId();
  });

  it('should return updated user obj (user doesnt change password)', async () => {
    (User.findByIdAndUpdate as jest.Mock).mockReturnValueOnce(newUser);

    const result = await userService.updateUserByID(id, updateData);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, { new: true });

    expect(result).toEqual(newUser);
  });

  it('should return updated user obj (user change password)', async () => {
    (User.findByIdAndUpdate as jest.Mock).mockReturnValueOnce(newUser);

    (bcrypt.hashPassword as jest.Mock).mockImplementationOnce(() => 'hashedPassword');

    const result = await userService.updateUserByID(id, { ...updateData, password: 'new_fake_password' });

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, { ...updateData, password: 'hashedPassword' }, { new: true });

    expect(result).toEqual(newUser);
  });

  it('should return error when something crashed', async () => {
    const error = new Error('unexpected error');

    (User.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(error);

    await expect(() => userService.updateUserByID(id, updateData)).rejects.toThrow(error);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
