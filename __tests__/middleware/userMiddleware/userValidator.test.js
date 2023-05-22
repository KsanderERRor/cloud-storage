const { userValidator } = require('../../../server/api/user/user.middleware');

const { ValidUserSchema } = require('../../../server/api/user/user.validator');

describe('check user if  sends valid update-data  middleware', () => {
  let req;
  let res;
  let next;
  let spyForValidate;
  beforeEach(() => {
    req = {
      body: {
        email: 'example@example.com',
        password: 'FakePassword123',
        discSpace: 1,
        userSpace: 2,
        avatar: 'fakeAvatar',
        is_deleted: false
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    spyForValidate = jest.spyOn(ValidUserSchema, 'validate');
  });

  it('should call next  if user sends valid query', async () => {
    await userValidator(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends empty query', async () => {
    req.body = {};
    await userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'email is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid new email', async () => {
    req.body.email = 'wrongEmail';
    await userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'email is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid new password', async () => {
    req.body.password = 'invalidpassword';
    await userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'password is not valid' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid discSpace', async () => {
    req.body.discSpace = 100001;
    await userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid userSpace', async () => {
    req.body.userSpace = 100001;
    await userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is out of range' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid type of avatar', async () => {
    req.body.avatar = true;
    await userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is not falid of type' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  it('should respond with an error message if user sends invalid type of is_deleted', async () => {
    req.body.is_deleted = true;
    await userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'input is not falid of type' });
    expect(next).not.toHaveBeenCalled();
    expect(spyForValidate).toHaveBeenCalledWith(req.body);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
