import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '../configs/variables';
import {IEncodeData,IRetunGenerateTokenPair} from '../types/apiRestGraphQl/oauthService/types'


export default {
  hashPassword: (password: string): Promise<String> => bcrypt.hash(password, 15),

  checkPasswords: async (hashPassword: string, password: string): Promise<void> => {
    const isPasswordsEquals: boolean = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsEquals) {
      throw new Error('email or password is wrong');
    }
  },

  generateAccessTokenPair: (encodeData: IEncodeData): IRetunGenerateTokenPair => {
    const accessToken: string = jwt.sign(encodeData, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken: string = jwt.sign(encodeData, config.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken
    };
  },

  validateAccessToken: (accessToken: string): string | JwtPayload => {
    try {
      return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
    } catch (e: any) {
      throw new Error(e);
    }
  }
};
