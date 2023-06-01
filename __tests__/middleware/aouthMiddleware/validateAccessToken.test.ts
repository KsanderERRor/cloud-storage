import { NextFunction } from 'express';

import authMdlwr from '../../../src/api/auth/auth.middleware';
import oauthService from '../../../src/services/oauth.service';

import { TReqLogoutUser, TResLocalsValideteToken } from '../../../src/types/apiRestGraphQl/auth/types';

jest.mock('../../../src/services/oauth.service', () => ({
  validateAccessToken: jest.fn((arg) => 'fake_accessToken')
}));

describe('validateAccessToken', () => {
  const token = 'fake_token';
  let req: TReqLogoutUser;
  let res: TResLocalsValideteToken;
  let next: NextFunction;
  beforeEach(() => {
    req = {
      get: jest.fn((arg) => token)
    } as unknown as TReqLogoutUser;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {}
    } as unknown as TResLocalsValideteToken;
    next = jest.fn();
  });

  it('should return res.status & res.json  if token is not found', () => {
    (req.get as jest.Mock) = jest.fn().mockImplementationOnce(() => null);

    // (jest.spyOn(req, 'get') as jest.Mock).mockReturnValueOnce(null)

    authMdlwr.validateAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'token is not found' });
    expect(next).not.toHaveBeenCalled();
    expect(oauthService.validateAccessToken).not.toHaveBeenCalled();
  });

  it('should call next if token was find and valids', () => {
    authMdlwr.validateAccessToken(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(oauthService.validateAccessToken).toHaveBeenCalledWith(token);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
