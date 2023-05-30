/* eslint-disable jest/expect-expect */
import userService from '../../../src/api/user/user.service';
import User from '../../../src/data-base/user';
import UserUtil from '../../../src/api/user/user.util';

jest.mock('../../../src/data-base/user');
jest.mock('../../../src/api/user/user.util');

describe('get all user by sort&filter&pagination', () => {
  let query;
  let UserDB;

  beforeEach(() => {
    query = {
      page: 1,
      perPage: 5,
      filterQuery: undefined
    };
    UserDB = [
      {
        email: 'email1',
        userSpace: 1
      },
      {
        email: 'email2',
        userSpace: 2
      }
    ];
  });

  it('should return dataUsers by sort', async () => {
    UserUtil.buildFilterQuery = jest.fn().mockReturnValueOnce({});

    User.count = jest.fn().mockReturnValue(UserDB.length);

   (jest.spyOn(User, 'find')as jest.Mock).mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnValue(UserDB)
    });

    await expect(userService.getAllUsersPagination(query)).resolves.toEqual({
      dataUsers: UserDB,
      page: query.page,
      perPage: query.perPage,
      total: UserDB.length
    });

    expect(UserUtil.buildFilterQuery).toHaveBeenCalledWith({ ...query.filterQuery });
    expect(User.find).toHaveBeenCalledWith({});
    expect(User.find().skip).toHaveBeenCalledWith((query.page - 1) * query.perPage);
    expect(User.find().limit).toHaveBeenCalledWith(query.perPage);
  });

  it('should return dataUsers by filter', async () => {
    UserUtil.buildFilterQuery = jest.fn().mockReturnValueOnce({});

    User.count = jest.fn().mockReturnValue(1);

    (jest.spyOn(User, 'find')as jest.Mock).mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnValue(UserDB[1])
    });

    await expect(userService.getAllUsersPagination({ page: undefined, perPage: undefined, ...query})).resolves.toEqual({
      dataUsers: UserDB[1],
      page: query.page,
      perPage: query.perPage,
      total: 1
    });

    expect(User.find).toHaveBeenCalledWith({});
    expect(UserUtil.buildFilterQuery).toHaveBeenCalledWith({ filterQuery: 'filterParams' });
    expect(User.find().skip).toHaveBeenCalledWith((query.page - 1) * query.perPage);
    expect(User.find().limit).toHaveBeenCalledWith(query.perPage);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
