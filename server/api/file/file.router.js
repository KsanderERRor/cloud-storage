const fileRouter = require('express').Router();
// const userMdlw = require('../user/user.validator')
const fileController = require('./file.controller');

fileRouter.post('/upload', fileController.upload);
fileRouter.get('/', fileController.getFileByParams);

module.exports = fileRouter;
