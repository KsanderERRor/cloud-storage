import { Schema, model, Document, Types } from 'mongoose';

import User, { UserDocument } from './user';

export interface IFileInput {
  name: string;
  size: number;
  user: UserDocument['_id'];
  path: string;
}

export interface IFileDocument extends IFileInput, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const fileScheme = new Schema(
  {
    name: { type: String, require: true },
    size: { type: Number },
    user: { type: Schema.Types.ObjectId, require: true, ref: User },
    path: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model<IFileDocument>('file', fileScheme);
