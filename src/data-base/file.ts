import { Schema, model } from 'mongoose';

import User from './user';
import { IFileDocument } from '../types/data-base/types';

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
