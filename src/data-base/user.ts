import { Schema, model } from 'mongoose';

import { IUserDocument } from '../types/data-base/types';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowerCase: true
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 30
    },
    discSpace: { type: Number, default: 1024 ** 3 * 10 },
    userSpace: { type: Number, default: 0 },
    avatar: { type: String },
    is_deleted: { type: Boolean, default: false, required: true }
    // files: [{type: Schema.Types.ObjectId, ref:'File'  }]
  },
  { timestamps: true }
);

export default model<IUserDocument>('User', UserSchema);
