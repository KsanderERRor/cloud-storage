const User = require('../../../server/data-base/user');
const { getUserByID } = require('../../../server/api/user/user.service');

jest.mock('../../../server/data-base/user');

describe('find single user by id', () => {
  let id;
  beforeEach(() => {
    id = 'fake_id';
  });
  it('should user was find', async () => {
    User.findById.mockResolvedValueOnce(true);

    const result = await getUserByID(id);

    expect(User.findById).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });

  it('should user wasn`t find', async () => {
    User.findById.mockResolvedValueOnce(false);

    const result = await getUserByID(id);

    expect(User.findById).toHaveBeenCalledWith(id);
    expect(result).toBe(false);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
