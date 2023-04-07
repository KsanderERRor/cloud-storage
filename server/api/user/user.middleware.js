const userService = require('./user.service');
const validateSchema = require('./user.validator');

module.exports = {
  checkUserDyplicates: async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.body.email);

      if (user) {
        res.status(400).json({ message: `User with  email ${user.email} already exists` });
      }

      next();
    } catch (e) {
      throw new Error(e);
    }
  },

  userValidator: (req, res, next) => {
    try {
      const { error } = validateSchema.ValidUserSchema.validate(req.body);

      if (error) throw new Error(error);

      next();
    } catch (e) {
      throw new Error(e);
    }
  },

  QueryPaginationValidator: (req, res, next) => {
    try {
      const { error } = validateSchema.ValidQuerySchema.validate(req.query);

      if (error) throw new Error(error);

      next();
    } catch (e) {
      throw new Error(e);
    }
  },

  UpdateUserValidator: (req, res, next) => {
    try {
      const { error } = validateSchema.ValidUserUpdateSchema.validate(req.body);

      if (error) throw new Error(error);

      next();
    } catch (e) {
      throw new Error(e);
    }
  }
};
