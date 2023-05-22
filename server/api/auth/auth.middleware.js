/* eslint-disable consistent-return */
const userService = require('../user/user.service');
const oauthService = require('../../services/oauth.service');

module.exports = {
  checkUser: async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.body.email);

      if (!user) {
        return res.status(400).json({ message: `User with  email ${req.body.email} not found` });
      }

      req.locals = { ...req.locals, user };

      next();
    } catch (e) {
      throw new Error(e);
    }
  },

  validateAccessToken: (req, res, next) => {
    try {
      const accessToken = req.get('Authorization');

      if (!accessToken) {
        return res.status(400).json({ message: 'token is not found' });
      }

      const user = oauthService.validateAccessToken(accessToken);

      req.locals = { user };

      next();
    } catch (e) {
      throw new Error(e);
    }
  }
};
