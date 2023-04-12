/* eslint-disable no-undef */
authRouter = require('express').Router();

const controller = require('./auth.controller');
const mdlw = require('./auth.middleware');

authRouter.post('/login', mdlw.checkUser, controller.loginUser);
authRouter.post('/logout', mdlw.validateAccessToken, controller.logoutUser);

module.exports = authRouter;
