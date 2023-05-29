import File from '../../data-base/file';
import fileUtil from './file.util';

export default {
  createFile: async (filedata, id) => {
    const { filename, path, size } = filedata;
    return File.create({ path, size, name: filename, user: id });
  },

  getFileByParams: async (queryParams) => {
    const { page = 1, perPage = 5, ...filterQuery } = queryParams;
    const skip = (page - 1) * perPage;

    const search = fileUtil.buildFilterQuery(filterQuery);

    const files = await File.find(search).skip(skip).limit(perPage);

    const count = await File.countDocuments(search);

    return {
      data: files,
      page,
      perPage,
      total: count
    };
  }
};
