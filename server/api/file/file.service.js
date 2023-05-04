const file = require('../../data-base/file');

module.exports = {
  createFile: async (filedata, id) => {
    const { filename } = filedata;
    await file.create({ ...filedata, name: filename, user: id });
  }
};
