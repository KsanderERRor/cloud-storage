import File from '../../data-base/file';
import util from './file.util';
import { TReqGetFile, IReturnFiles } from '../../types/apiRestGraphQl/file/types';
import { IFileDocument, IFileInput } from '../../types/data-base/types';

export default {
  createFile: async (filedata: Express.Multer.File, id: IFileInput['user']): Promise<IFileDocument> => {
    const { filename, path, size } = filedata;
    return File.create({ path, size, name: filename, user: id });
  },

  getFileByParams: async (queryParams: TReqGetFile['query']): Promise<IReturnFiles> => {
    const { page = 1, perPage = 5, ...filterQuery } = queryParams;
    const skip = (page - 1) * perPage;

    const search = util.buildFilterQuery(filterQuery);

    const files = await File.find(search).skip(skip).limit(perPage);

    const count = await File.countDocuments(search);

    return {
      data: files,
      page,
      perPage,
      total: count
    };
  }
};
