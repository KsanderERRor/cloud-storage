const file = require('../../data-base/file');
const fileUtil = require('./file.util');

module.exports = {
  createFile: async (filedata, id) => {
    const { filename } = filedata;
    await file.create({ ...filedata, name: filename, user: id });
  },

  getFileByParams: async (queryParams = {}) => {
    const { page = 1, perPage = 5, ...filterQuery } = queryParams;
    const skip = (page - 1) * perPage;

    const search = fileUtil.buildFilterQuery(filterQuery);

    const files = await file.find(search).skip(skip).limit(perPage);

    const count = await file.countDocuments(search);

    return {
      data: files,
      page,
      perPage,
      total: count
    };
  }
};
