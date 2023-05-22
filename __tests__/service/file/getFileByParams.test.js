const { getFileByParams } = require('../../../server/api/file/file.service');
const { buildFilterQuery } = require('../../../server/api/file/file.util');
const File = require('../../../server/data-base/file');

jest.mock('../../../server/api/file/file.util');
jest.mock('../../../server/data-base/file');

describe('get all file by sort&filter', () => {
  let filesDB;
  let query;
  let emptyQuery;
  beforeEach(() => {
    filesDB = [
      {
        name: 'fake_file_1',
        size: 1
      },
      {
        name: 'fake_file_1',
        size: 2
      }
    ];
    query = {
      page: 1,
      perPage: 5,
      filterQuery: 'filterParams'
    };
    emptyQuery = {};
  });

  it('should get all files by sort&filter', async () => {
    buildFilterQuery.mockReturnValueOnce({});

    File.countDocuments.mockReturnValue(filesDB.length);

    jest.spyOn(File, 'find').mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnValue(filesDB)
    });

    await expect(getFileByParams(query)).resolves.toEqual({
      data: filesDB,
      page: query.page,
      perPage: query.perPage,
      total: filesDB.length
    });

    expect(buildFilterQuery).toHaveBeenCalledWith({ filterQuery: 'filterParams' });
    expect(File.find).toHaveBeenCalledWith({});
    expect(File.find().skip).toHaveBeenCalledWith((query.page - 1) * query.perPage);
    expect(File.find().limit).toHaveBeenCalledWith(query.perPage);
  });

  it('should get all files (query is empty)', async () => {
    buildFilterQuery.mockReturnValueOnce({});

    File.countDocuments.mockReturnValue(filesDB.length);

    jest.spyOn(File, 'find').mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnValue(filesDB)
    });

    await expect(getFileByParams(emptyQuery)).resolves.toEqual({
      data: filesDB,
      page: 1,
      perPage: 5,
      total: filesDB.length
    });

    expect(buildFilterQuery).toHaveBeenCalledWith({});
    expect(File.find).toHaveBeenCalledWith({});
    expect(File.find().skip).toHaveBeenCalledWith(0);
    expect(File.find().limit).toHaveBeenCalledWith(5);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
