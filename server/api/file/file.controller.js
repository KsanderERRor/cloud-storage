const uploadFile = require('./file.upload');

module.exports = {
  upload: async (req, res) => {
    try {
      await uploadFile(req, res);
      if (req.file === undefined) {
        res.status(400).send({ message: 'Upload a file please!' });
      }
      res.status(200).send({
        message: `The following file was uploaded successfully: ${req.file.originalname}`
      });
    } catch (err) {
      res.status(500).send({
        message: `Unable to upload the file:. ${err}`
      });
    }
  }
};
