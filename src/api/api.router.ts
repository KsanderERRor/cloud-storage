import { Router } from 'express';

import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import fileRouter from './file/file.router';

const apiRouter: Router = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/file', fileRouter);

export default apiRouter;
