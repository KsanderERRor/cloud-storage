const fileRouter = require('express').Router();

const fileController = require('./file.controller');

fileRouter.post('/upload', fileController.upload);

module.exports = fileRouter;
