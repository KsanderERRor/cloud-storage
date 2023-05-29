import { Request, Response } from 'express';
import uploadFile from './file.uploadFileMiddleware';
import fileService from './file.service';
import { IFileInput } from '../../data-base/file';

interface IReqBody {
  user: IFileInput['user'];
}
type TReqUpload = Request<any, any, IReqBody>;

export interface IReqQueryParams {
  page: number;
  perPage: number;
  name: string;
  size_gte: number;
  size_lte: number;
  date_gte: Date;
  date_lte: Date;
  user: IFileInput['user'];
}
export type TReqGetFile = Request<any, any, any, IReqQueryParams>;

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

  getFileByParams: async (req: TReqGetFile, res: Response) => {
    try {
      const files = await fileService.getFileByParams(req.query);

      res.json(files);
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
