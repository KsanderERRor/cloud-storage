import { Types } from 'mongoose';

import userService from '../../../src/api/user/user.service';
import User from '../../../src/data-base/user';
import UserUtil from '../../../src/api/user/user.util';

import { IUserDocument } from '../../../src/types/data-base/types';
import { TReqGetUsers } from '../../../src/types/apiRestGraphQl/user/types';

jest.mock('../../../src/data-base/user');
jest.mock('../../../src/api/user/user.util');

describe('get all user by sort&filter&pagination', () => {
  let query: TReqGetUsers['query'];
  let UserDB: IUserDocument[];

  beforeEach(() => {
    query = {
      page: 1,
      perPage: 5,
      discSpace_lte: 1,
      email: 'fake_email'
    };
    UserDB = [
      new User({
        _id: new Types.ObjectId(),
        email: 'fake_email',
        password: 'fake_password',
        diskSpace: 2,
        userSpace: 3,
        avatar: 'fake_avatar',
        is_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }),
      new User({
        _id: new Types.ObjectId(),
        email: 'fake_email',
        password: 'fake_password',
        diskSpace: 2,
        userSpace: 3,
        avatar: 'fake_avatar',
        is_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    ];
  });

  it('should return dataUsers by sort', async () => {
    UserUtil.buildFilterQuery = jest.fn().mockReturnValueOnce({});

    User.count = jest.fn().mockReturnValue(UserDB.length);

    (jest.spyOn(User, 'find') as jest.Mock).mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnValue(UserDB)
    });

    await expect(userService.getAllUsersPagination(query)).resolves.toEqual({
      dataUsers: UserDB,
      page: query.page,
      perPage: query.perPage,
      total: UserDB.length
    });

    expect(UserUtil.buildFilterQuery).toHaveBeenCalledWith({ discSpace_lte: 1, email: 'fake_email' });
    expect(User.find).toHaveBeenCalledWith({});
    expect(User.find().skip).toHaveBeenCalledWith(0);
    expect(User.find().limit).toHaveBeenCalledWith(query.perPage);
  });

  it('should return dataUsers by filter', async () => {
    UserUtil.buildFilterQuery = jest.fn().mockReturnValueOnce({});

    User.count = jest.fn().mockReturnValue(1);

    (jest.spyOn(User, 'find') as jest.Mock).mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnValue(UserDB[1])
    });

    await expect(userService.getAllUsersPagination({ page: undefined, perPage: undefined, ...query })).resolves.toEqual({
      dataUsers: UserDB[1],
      page: query.page,
      perPage: query.perPage,
      total: 1
    });

    expect(User.find).toHaveBeenCalledWith({});
    expect(UserUtil.buildFilterQuery).toHaveBeenCalledWith({ discSpace_lte: 1, email: 'fake_email' });
    expect(User.find().skip).toHaveBeenCalledWith(0);
    expect(User.find().limit).toHaveBeenCalledWith(query.perPage);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
