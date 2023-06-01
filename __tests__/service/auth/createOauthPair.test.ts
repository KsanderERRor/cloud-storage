import OAuth from '../../../src/data-base/OAuth';
import authService from '../../../src/api/auth/auth.service';

import { IOauthInput } from '../../../src/types/data-base/types';
import { Types } from 'mongoose';

jest.mock('../../../src/data-base/OAuth');

describe('createOauthPair', () => {
  let tokenData: IOauthInput;
  beforeEach(() => {
    tokenData = {
      accessToken: 'fake_accessToken',
      refreshToken: 'fake_refreshToken',
      user: new Types.ObjectId()
    };
  });

  it('should resolved  token pair', async () => {
    (OAuth.create as jest.Mock).mockResolvedValueOnce(tokenData);

    const result = await authService.createOauthPair(tokenData);

    expect(OAuth.create).toHaveBeenCalledWith(tokenData);
    expect(result).toBe(tokenData);
  });

  it('should sreturn error when something crashed', async () => {
    (OAuth.create as jest.Mock).mockRejectedValueOnce('error');

    await expect(() => authService.createOauthPair(tokenData)).rejects.toBe('error');

    expect(OAuth.create).toHaveBeenCalledWith(tokenData);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
