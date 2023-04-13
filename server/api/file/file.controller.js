const fileService = require('./file.service');

module.exports = {
  createFile: (req, res) => {
    try {
      const { user } = req.params;
      console.log(user);
      const a = fileService.createFile({ user });

      res.json(a);
    } catch (e) {
      console.log(e);
    }
  }
};
