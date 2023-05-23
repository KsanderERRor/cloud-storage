/* eslint-disable jest/expect-expect */
const { getAllUsersPagination } = require('../../../server/api/user/user.service');
const User = require('../../../server/data-base/user');
const { buildFilterQuery } = require('../../../server/api/user/user.util');

jest.mock('../../../server/data-base/user');
jest.mock('../../../server/api/user/user.util');

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
    buildFilterQuery.mockReturnValueOnce({});

    User.count.mockReturnValue(UserDB.length);

    jest.spyOn(User, 'find').mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnValue(UserDB)
    });

    await expect(getAllUsersPagination(query)).resolves.toEqual({
      dataUsers: UserDB,
      page: query.page,
      perPage: query.perPage,
      total: UserDB.length
    });

    expect(buildFilterQuery).toHaveBeenCalledWith({ ...query.filterQuery });
    expect(User.find).toHaveBeenCalledWith({});
    expect(User.find().skip).toHaveBeenCalledWith((query.page - 1) * query.perPage);
    expect(User.find().limit).toHaveBeenCalledWith(query.perPage);
  });

  it('should return dataUsers by filter', async () => {
    buildFilterQuery.mockReturnValueOnce({});

    User.count.mockReturnValue(1);

    jest.spyOn(User, 'find').mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnValue(UserDB[1])
    });

    await expect(getAllUsersPagination({ page: undefined, perPage: undefined, filterQuery: 'filterParams' })).resolves.toEqual({
      dataUsers: UserDB[1],
      page: query.page,
      perPage: query.perPage,
      total: 1
    });

    expect(User.find).toHaveBeenCalledWith({});
    expect(buildFilterQuery).toHaveBeenCalledWith({ filterQuery: 'filterParams' });
    expect(User.find().skip).toHaveBeenCalledWith((query.page - 1) * query.perPage);
    expect(User.find().limit).toHaveBeenCalledWith(query.perPage);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
