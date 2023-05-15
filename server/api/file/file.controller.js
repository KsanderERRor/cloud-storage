/* eslint-disable consistent-return */
const uploadFile = require('./file.upload');
const fileService = require('./file.service');

module.exports = {
  upload: async (req, res) => {
    try {
      await uploadFile(req, res);
      if (req.file === undefined) {
        return res.status(400).send({ message: 'Upload a file please!' });
      }

      await fileService.createFile(req.file, req.body.user);

      res.status(200).send({
        message: `The following file was uploaded successfully: ${req.file.originalname}`
      });
    } catch (err) {
      res.status(500).send({
        message: `Unable to upload the file:. ${err}`
      });
    }
  },

  getFileByParams: async (req, res) => {
    try {
      const files = await fileService.getFileByParams(req.query);
      res.json(files);
    } catch (e) {
      throw new Error(e);
    }
  }
};
