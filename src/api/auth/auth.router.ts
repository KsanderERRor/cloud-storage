/* eslint-disable no-undef */
import authController from './auth.controller';
import authMiddleware from './auth.middleware';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post('/login', authMiddleware.checkUserWasAlreadyCreate, authController.loginUser);
authRouter.post('/logout', authMiddleware.validateAccessToken, authController.logoutUser);

export default authRouter;
