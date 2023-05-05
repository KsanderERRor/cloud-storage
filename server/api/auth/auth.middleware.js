const userService = require('../user/user.service');
const oauthService = require('../../services/oauth.service');

module.exports = {
  checkUser: async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.body.email);
      // console.log(user,'user auth mdlw');
      if (!user) {
        res.status(400).json({ message: `User with  email ${user.email} not found` });
      }

      req.locals = { ...req.locals, user };
      // console.log(req.locals,"req---locals___________________________");
      next();
    } catch (e) {
      throw new Error(e);
    }
  },

  validateAccessToken: (req, res, next) => {
    try {
      const accessToken = req.get('Authorization');

      if (!accessToken) {
        res.status(400).json({ message: 'token is not found' });
      }

      const user = oauthService.validateAccessToken(accessToken);
      //  console.log(user,'user________________________________________validate');
      req.locals = { user };

      next();
    } catch (e) {
      throw new Error(e);
    }
  }
};
