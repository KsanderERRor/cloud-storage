const { validateAccessToken } = require('../../../server/api/auth/auth.middleware');
const oauthService = require('../../../server/services/oauth.service');

jest.mock('../../../server/services/oauth.service', () => ({
  validateAccessToken: jest.fn((arg) => arg)
}));

describe('validateAccessToken', () => {
  const token = 'fake_token';
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      get: jest.fn(() => token),
      locals: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return res.status & res.json  if token is not found', async () => {
    req.get.mockImplementationOnce(() => null);

    await validateAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'token is not found' });
    expect(next).not.toHaveBeenCalled();
    expect(oauthService.validateAccessToken).not.toHaveBeenCalled();
  });

  it('should call next if token isnt undefined', async () => {
    await validateAccessToken(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(oauthService.validateAccessToken).toHaveBeenCalledWith(token);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
