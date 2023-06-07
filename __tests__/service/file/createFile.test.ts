import { Types } from 'mongoose';

import file from '../../../src/data-base/file';
import fileService from '../../../src/api/file/file.service';

import { IUserDocument } from '../../../src/types/data-base/types';

jest.mock('../../../src/data-base/file');

describe('this func wtite file in dateBase', () => {
  let filedata: Express.Multer.File;
  let id: IUserDocument['_id'];
  file.create = jest.fn();
  beforeEach(() => {
    filedata = {
      filename: 'fake_file_name',
      originalname: 'fake',
      encoding: 'fake',
      stream: undefined,
      mimetype: 'fake',
      destination: 'fake',
      fieldname: 'fake',
      size: 1,
      path: 'fake_path',
      buffer: undefined
    };
    id = new Types.ObjectId();
  });

  it('should return true if func worked correctly', async () => {
    (file.create as jest.Mock).mockResolvedValueOnce({ ...filedata, name: id });

    await expect(fileService.createFile(filedata, id)).resolves.toEqual({ ...filedata, name: id });

    expect(file.create).toHaveBeenCalledWith({ path: filedata.path, size: filedata.size, name: filedata.filename, user: id });
  });

  it('should rejected error if filename have false velue', async () => {
    (file.create as jest.Mock).mockRejectedValueOnce('error');

    await expect(fileService.createFile({ ...filedata, filename: 'error' }, id)).rejects.toBe('error');

    expect(file.create).toHaveBeenCalledWith({ path: filedata.path, size: filedata.size, name: 'error', user: id });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
