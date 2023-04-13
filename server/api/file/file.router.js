const fileRouter = require('express').Router();

const oauthMdlw = require('../auth/auth.middleware');
const fileController = require('./file.controller');

fileRouter.post('/', oauthMdlw.validateAccessToken, fileController.createFile);

module.exports = fileRouter;
