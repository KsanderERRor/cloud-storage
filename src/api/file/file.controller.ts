import {Response } from 'express';
import uploadFile from './file.uploadFileMiddleware';
import fileService from './file.service';
import { TReqUpload,  TReqGetFile} from '../../types/apiRestGraphQl/file/types'


export default {
  upload: async (req: TReqUpload, res: Response): Promise<void> => {
    try {
      await uploadFile(req, res);
      if (req.file === undefined) {
        res.status(400).send({ message: 'Upload a file please!' });
        return;
      }

      const file = await fileService.createFile(req.file, req.body.user);

      res.status(200).json(file);
    } catch (e: any) {
      res.status(500).send({
        message: `Unable to upload the file:. ${e}`
      });
    }
  },

  getFileByParams: async (req: TReqGetFile, res: Response): Promise<void> => {
    try {
      const files = await fileService.getFileByParams(req.query);

      res.json(files);
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
