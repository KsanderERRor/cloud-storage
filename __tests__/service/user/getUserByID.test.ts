import { Types } from 'mongoose';

import User from '../../../src/data-base/user';
import userServer from '../../../src/api/user/user.service';

import { IUserDocument } from '../../../src/types/data-base/types';
jest.mock('../../../src/data-base/user');

describe('find single user by id', () => {
  let id: IUserDocument['_id'];

  beforeEach(() => {
    id = new Types.ObjectId();
  });

  it('should user was find', async () => {
    (User.findById as jest.Mock).mockResolvedValueOnce(true);

    const result = await userServer.getUserByID(id);

    expect(User.findById).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });

  it('should user wasn`t find', async () => {
    (User.findById as jest.Mock).mockResolvedValueOnce(false);

    const result = await userServer.getUserByID(id);

    expect(User.findById).toHaveBeenCalledWith(id);
    expect(result).toBe(false);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
