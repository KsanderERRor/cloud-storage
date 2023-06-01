import { ReadStream, createWriteStream } from 'fs';
import { Upload } from 'graphql-upload-minimal';
import { Types } from 'mongoose';


export interface IStoreUploadResult {
    path: string;
}
  
export interface IStoreUploadParams {
    stream: ReadStream;
    filename: string;
}
export interface IUploadResult {
    filename: string
    mimetype: string 
    path: string
}
  
export interface IUploadArg {
    upload:Upload
    user: Types.ObjectId;
}
  

  