import fileService from '../../../src/api/file/file.service';
import fileUtil from '../../../src/api/file/file.util';
import File from '../../../src/data-base/file';

import { IReqQueryParams } from '../../../src/types/apiRestGraphQl/file/types';

import { IFileDocument } from '../../../src/types/data-base/types';

jest.mock('../../../src/api/file/file.util');
jest.mock('../../../src/data-base/file');

describe('getFileByParams', () => {
  let filesDB: IFileDocument[];
  let query: IReqQueryParams;
  beforeEach(() => {
    filesDB = [
      new File({
        name: 'fake_file_1',
        size: 1
      }),
      new File({
        name: 'fake_file_1',
        size: 2
      })
    ];
    query = {
      page: 1,
      perPage: 5
    };
  });

  it('should get all files by sort&filter', async () => {
    (fileUtil.buildFilterQuery as jest.Mock).mockReturnValueOnce({});

    (File.countDocuments as jest.Mock).mockReturnValue(filesDB.length);

    (jest.spyOn(File, 'find') as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnValue(filesDB)
    });

    await expect(fileService.getFileByParams(query)).resolves.toEqual({
      data: filesDB,
      page: query.page,
      perPage: query.perPage,
      total: filesDB.length
    });

    expect(fileUtil.buildFilterQuery).toHaveBeenCalledWith({});
    expect(File.find).toHaveBeenCalledWith({});
    expect(File.find().skip).toHaveBeenCalledWith(0);
    expect(File.find().limit).toHaveBeenCalledWith(query.perPage);
  });

  it('should get all files (query is empty)', async () => {
    (fileUtil.buildFilterQuery as jest.Mock).mockReturnValueOnce({});

    (File.countDocuments as jest.Mock).mockReturnValue(filesDB.length);

    (jest.spyOn(File, 'find') as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnValue(filesDB)
    });

    await expect(fileService.getFileByParams({ ...query, page: undefined, perPage: undefined })).resolves.toEqual({
      data: filesDB,
      page: 1,
      perPage: 5,
      total: filesDB.length
    });

    expect(fileUtil.buildFilterQuery).toHaveBeenCalledWith({});
    expect(File.find).toHaveBeenCalledWith({});
    expect(File.find().skip).toHaveBeenCalledWith(0);
    expect(File.find().limit).toHaveBeenCalledWith(5);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
