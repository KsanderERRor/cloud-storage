import { Schema, model } from 'mongoose';

import User from './user';
import { IOauthDocument } from '../types/data-base/types';

const OAuthScheme = new Schema(
  {
    accessToken: { type: String, trim: true, required: true },
    refreshToken: { type: String, trim: true, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: User }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model<IOauthDocument>('OAuth', OAuthScheme);
