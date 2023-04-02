const userService = require("./user.service");

module.exports = {
  createUser: async (req, res) => {
    try {
      const createdUser = await userService.createdUser(req.body);

      res.status(201).json(createdUser);
    } catch (e) {
      //   console.log(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await userService.deleteUserByID(req.params.userId);

      res.json(`user was delete`);
    } catch (e) {
      next(e);
    }
  },

  getOneUserByID: async (req, res, next) => {
    try {
      const user = await userService.getUserByID(req.params.userId);

      res.json(user)
    } catch (e) {
      next(e)
    }
  }
};
