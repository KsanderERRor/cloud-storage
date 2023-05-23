const OAuth = require('../../../server/data-base/OAuth');
const { deleteByParams } = require('../../../server/api/auth/auth.service');

jest.mock('../../../server/data-base/OAuth');

describe('deleteByParams', () => {
  let tokenData;
  beforeEach(() => {
    tokenData = {
      accessToken: 'fake_accessToken'
    };
  });

  it('should resolved  true', async () => {
    OAuth.deleteMany.mockResolvedValueOnce(true);

    const result = await deleteByParams(tokenData);

    expect(OAuth.deleteMany).toHaveBeenCalledWith(tokenData);
    expect(result).toBe(true);
  });

  it('should sreturn error when something crashed', async () => {
    OAuth.deleteMany.mockRejectedValueOnce('error');

    await expect(() => deleteByParams(tokenData)).rejects.toBe('error');

    expect(OAuth.deleteMany).toHaveBeenCalledWith(tokenData);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
