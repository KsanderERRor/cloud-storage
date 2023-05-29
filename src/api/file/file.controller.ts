/* eslint-disable consistent-return */
import uploadFile from './file.upload';
import fileService from './file.service';

export default {
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
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
