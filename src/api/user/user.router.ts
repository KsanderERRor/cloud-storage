import { Router } from 'express';

const userRouter: Router = Router();

import mdlw from './user.middleware';
import commonMdlw from '../../commonMiddleware/common.middleware';
import userController from './user.controller';

userRouter.get('/', mdlw.QueryPaginationValidator, userController.getAllUsersPagination);

userRouter.post('/registration', mdlw.userValidator, mdlw.checkUserDyplicates, userController.createUser);

userRouter.use('/:userId', commonMdlw.checkUser, commonMdlw.userIsNotDeleted);

userRouter.delete('/:userId', userController.deleteUser);
userRouter.get('/:userId', userController.getOneUserByID);
userRouter.put('/:userId', mdlw.UpdateUserValidator, userController.updateOneUserByID);

export default userRouter;
