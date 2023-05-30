import {Document, Types } from 'mongoose';
// ///////////////////////////////////////////////////////////////////////types_data_base///////////////////
// ////////////////////////////////userSchema//////////////
export interface IUserInput {
  email: string;
  password: string;
  discSpace: number;
  userSpace: number;
  avatar: string;
  is_deleted: boolean;
}

export interface IUserDocument extends IUserInput, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
// ////////////////////////////////aouthSchema//////////////

export interface IOauthInput {
    accessToken: string;
    refreshToken: string;
    user: IUserDocument['_id'];
}
  
export interface IOauthDocument extends IOauthInput, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updetedAt: Date;
}

// ////////////////////////////////fileSchema//////////////

export interface IFileInput {
    name: string;
    size: number;
    user: IUserDocument['_id'];
    path: string;
}
  
export interface IFileDocument extends IFileInput, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
 