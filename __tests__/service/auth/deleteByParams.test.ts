import OAuth from '../../../src/data-base/OAuth';
import authService from '../../../src/api/auth/auth.service';

import { IDeleteTokenArg } from '../../../src/types/apiRestGraphQl/auth/types';

jest.mock('../../../src/data-base/OAuth');

describe('deleteByParams', () => {
  let tokenData: IDeleteTokenArg;
  beforeEach(() => {
    tokenData = {
      accessToken: 'fake_accessToken'
    };
  });

  it('should resolved  true', async () => {
    (OAuth.deleteMany as jest.Mock).mockResolvedValueOnce(true);

    const result = await authService.deleteByParams(tokenData);

    expect(OAuth.deleteMany).toHaveBeenCalledWith(tokenData);
    expect(result).toBe(true);
  });

  it('should sreturn error when something crashed', async () => {
    (OAuth.deleteMany as jest.Mock).mockRejectedValueOnce('error');

    await expect(() => authService.deleteByParams(tokenData)).rejects.toBe('error');

    expect(OAuth.deleteMany).toHaveBeenCalledWith(tokenData);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
