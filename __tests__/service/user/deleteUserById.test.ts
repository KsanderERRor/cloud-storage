import { Types } from 'mongoose';
import User, { UserDocument } from '../../../src/data-base/user';
import userService from '../../../src/api/user/user.service';

jest.mock('../../../src/data-base/user');

describe('delete user by id', () => {
  let userId: UserDocument['_id'];

  beforeEach(() => {
    userId = new Types.ObjectId();
  });

  it('should function created user worked successfully', async () => {
    // const mockUpdateFn = jest.fn().mockResolvedValueOnce(true);
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
