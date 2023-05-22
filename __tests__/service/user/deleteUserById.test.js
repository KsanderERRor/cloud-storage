const User = require('../../../server/data-base/user');
const { deleteUserByID } = require('../../../server/api/user/user.service');

jest.mock('../../../server/data-base/user');

describe('delete user by id', () => {
  let userId;
  User.findByIdAndUpdate = jest.fn();
  beforeEach(() => {
    userId = 'fake_id';
  });

  it('should function created user worked successfully', async () => {
    User.findByIdAndUpdate.mockResolvedValueOnce(true);

    await deleteUserByID(userId);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, { $set: { is_deleted: true } });
  });

  it('should sets error in User.create', async () => {
    User.findByIdAndUpdate.mockRejectedValueOnce('error');

    await expect(deleteUserByID(userId)).rejects.toBe('error');
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, { $set: { is_deleted: true } });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
