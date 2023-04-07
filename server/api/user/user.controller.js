const userService = require('./user.service');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const createdUser = await userService.createdUser(req.body);

      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
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

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  updateOneUserByID: async (req, res, next) => {
    try {
      await userService.updateUserByID(req.params.userId, req.body);

      res.json('user was update');
    } catch (e) {
      next(e);
    }
  },
  getAllUsersPagination: async (req, res, next) => {
    try {
      const users = await userService.getAllUsersPagination(req.query);

      res.json(users);
    } catch (e) {
      next(e);
    }
  }
};
