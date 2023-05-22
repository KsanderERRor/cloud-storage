const file = require('../../../server/data-base/file');
const { createFile } = require('../../../server/api/file/file.service');

jest.mock('../../../server/data-base/file');

describe('this func wtite file in dateBase', () => {
  let filedata;
  let id;
  file.create = jest.fn();
  beforeEach(() => {
    filedata = {
      filename: 'fake_file_name',
      size: 1,
      path: 'fake_path'
    };
    id = 'fake_id';
  });

  it('should return true if func worked correctly', async () => {
    file.create.mockResolvedValueOnce({ ...filedata, name: id });

    await expect(createFile(filedata, id)).resolves.toEqual({ ...filedata, name: id });

    expect(file.create).toHaveBeenCalledWith({ path: filedata.path, size: filedata.size, name: filedata.filename, user: id });
  });

  it('should rejected error if filename have false velue', async () => {
    file.create.mockRejectedValueOnce('error');

    await expect(createFile({ ...filedata, filename: null }, id)).rejects.toBe('error');

    expect(file.create).toHaveBeenCalledWith({ path: filedata.path, size: filedata.size, name: null, user: id });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
