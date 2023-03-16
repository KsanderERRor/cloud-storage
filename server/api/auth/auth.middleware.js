/* eslint-disable no-undef */
module.exports = {
  checkUser: async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.body.email);

      if (!user) {
        res
          .status(400)
          .json({ message: `User with  email ${user.email} not found` });
      }

      next();
    } catch (e) {
      throw new Error(e);
    }
  },
};
