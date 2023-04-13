/* eslint-disable no-underscore-dangle */
const oauthService = require('../../services/oauth.service');
const service = require('./auth.service');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { user } = req.locals;

      await oauthService.checkPasswords(user.password, req.body.password);
      const tokenPair = oauthService.generateAccessTokenPair({ user: user._id });

      await service.createOauthPair({ ...tokenPair, user: user._id });

      res.json({
        ...tokenPair,
        user
      });
    } catch (e) {
      next(e);
    }
  },

  logoutUser: async (req, res) => {
    try {
      const accessToken = req.get('Authorization');

      await service.deleteByParams({ accessToken });

      res.json('token was delete');
    } catch (e) {
      throw new Error();
    }
  }
};
