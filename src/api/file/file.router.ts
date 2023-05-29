import { Router } from 'express';

import fileController from './file.controller';

const fileRouter: Router = Router();

fileRouter.post('/upload', fileController.upload);
fileRouter.get('/', fileController.getFileByParams);

export default fileRouter;
