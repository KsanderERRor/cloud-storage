const userService = require('../user/user.service');

module.exports = {
  checkUser: async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.body.email);
      // console.log(user,'user auth mdlw');
      if (!user) {
        res.status(400).json({ message: `User with  email ${user.email} not found` });
      }

      req.locals = { ...req.locals, user };
      // console.log(req.locals,"req---locals");
      next();
    } catch (e) {
      throw new Error(e);
    }
  }
};
