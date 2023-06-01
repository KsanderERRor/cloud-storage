import { FileUpload} from 'graphql-upload-minimal'
import { ReadStream, createWriteStream } from 'fs';
import { join } from 'path';

import {IStoreUploadParams,IStoreUploadResult,IUploadResult} from '../types/apiRestGraphQl/file/types_Scalar_Upload'


const storeUpload = async ({ stream, filename }:IStoreUploadParams):Promise<IStoreUploadResult> => {
  const uploadDir = './storage';
  const path = join(uploadDir, filename);
  console.log(path, {path});
  
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ path }))
      .on('error', reject)
  );
};

const processUpload = async (upload:FileUpload):Promise<IUploadResult> => {
  const { createReadStream, filename, mimetype } = upload;
  const stream = createReadStream();
  const { path } = await storeUpload({ stream, filename });
  return { filename, mimetype, path };
};

export default  processUpload;
