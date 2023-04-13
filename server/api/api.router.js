const apiRouter = require('express').Router();

const userRouter = require('./user/user.router');
const authRouter = require('./auth/auth.router');
const fileRouter = require('./file/file.router');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/file', fileRouter);

module.exports = apiRouter;
