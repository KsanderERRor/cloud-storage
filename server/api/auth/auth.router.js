/* eslint-disable no-undef */
authRouter = require("express").Router();

const { loginUser } = require("./auth.controller");
const mdlw = require("./auth.middleware");

authRouter.use("/", mdlw.checkUser, loginUser);

module.exports = authRouter;
