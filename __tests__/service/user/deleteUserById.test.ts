import { Types } from 'mongoose';

import User from '../../../src/data-base/user';
import userService from '../../../src/api/user/user.service';

import { IUserDocument } from '../../../src/types/data-base/types';

jest.mock('../../../src/data-base/user');

describe('delete user by id', () => {
  let userId: IUserDocument['_id'];

  beforeEach(() => {
    userId = new Types.ObjectId();
  });

  it('should function created user worked successfully', async () => {
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(true);

    await userService.deleteUserByID(userId);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, { $set: { is_deleted: true } });
  });

  it('should sets error in User.create', async () => {
    User.findByIdAndUpdate = jest.fn().mockRejectedValueOnce('error');

    await expect(userService.deleteUserByID(userId)).rejects.toBe('error');
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, { $set: { is_deleted: true } });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
