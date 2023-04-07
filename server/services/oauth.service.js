const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../configs/variables');

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 15),

  checkPasswords: async (hashPassword, password) => {
    const isPasswordsEquals = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsEquals) {
      throw new Error('email or password is wrong');
    }
  },

  generateAccessTokenPair: (encodeData = {}) => {
    const accessToken = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken
    };
  }
};
