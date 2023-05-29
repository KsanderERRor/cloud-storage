import { Schema, model, Document, Types } from 'mongoose';
import User, { UserDocument } from './user';

export interface IOauthInput {
  accessToken: string;
  refreshToken: string;
  user: UserDocument['_id'];
}

export interface IOauthDocument extends IOauthInput, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updetedAt: Date;
}
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
