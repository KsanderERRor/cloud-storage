const OAuth = require('../../../server/data-base/OAuth');
const { createOauthPair } = require('../../../server/api/auth/auth.service');

jest.mock('../../../server/data-base/OAuth');

describe('createOauthPair', () => {
  let tokenData;
  beforeEach(() => {
    tokenData = {
      accessToken: 'fake_accessToken',
      refreshToken: 'fake_refreshToken'
    };
  });

  it('should resolved  token pair', async () => {
    OAuth.create.mockResolvedValueOnce(tokenData);

    const result = await createOauthPair(tokenData);

    expect(OAuth.create).toHaveBeenCalledWith(tokenData);
    expect(result).toBe(tokenData);
  });

  it('should sreturn error when something crashed', async () => {
    OAuth.create.mockRejectedValueOnce('error');

    await expect(() => createOauthPair(tokenData)).rejects.toBe('error');

    expect(OAuth.create).toHaveBeenCalledWith(tokenData);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
