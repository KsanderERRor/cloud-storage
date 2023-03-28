const { checkUser } = require("./auth.middleware");
const oauthService = require('../../services/oauth.service')
const service = require('./auth.service')
module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const user = req.locals.user;

      await oauthService.checkPasswords(user.password, req.body.password);
      const tokenPair = oauthService.generateAccessTokenPair({...user});

      await service.createOauthPair({ ...tokenPair, user: user._id });
      res.json({
        ...tokenPair,
        user
      });
    } catch (e) {
      next(e);
    }
  },
};
