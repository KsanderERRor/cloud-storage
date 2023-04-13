/* eslint-disable no-undef */
authRouter = require('express').Router();

const authController = require('./auth.controller');
const mdlw = require('./auth.middleware');

authRouter.post('/login', mdlw.checkUser, authController.loginUser);
authRouter.post('/logout', mdlw.validateAccessToken, authController.logoutUser);

module.exports = authRouter;
