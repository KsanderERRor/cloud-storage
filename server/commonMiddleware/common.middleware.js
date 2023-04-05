const userService = require("../api/user/user.service");

module.exports = {

  checkUser: async (req, res, next) => {
    try {
      const user = await userService.getUserByID(req.params.userId);

      if (!user) {
        res.json({ message: `User with id ${req.params.userId} is not defined` });
      }

      req.locals = {...req.locals, user };

      next();
    } catch (e) {
      throw new Error(e);
    }
  },

  userIsNotDeleted: (req, res, next) => {
    req.locals.user.is_deleted === false ? next() : res.status(404).json({error: true, message: 'user not found'});
  },

}