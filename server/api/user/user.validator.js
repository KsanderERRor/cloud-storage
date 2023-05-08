const joi = require('joi');

const { PASSWORD_REX } = require('../../configs/regax');

module.exports = {
  ValidUserSchema: joi.object({
    email: joi.string().required().email().error(new Error('email is not valid')),
    password: joi.string().required().regex(PASSWORD_REX).error(new Error('password is not valid')),
    discSpace: joi.number().min(0),
    userSpace: joi.number().min(0),
    avatar: joi.string(),
    is_deleted: joi.boolean()
  }),

  ValidQuerySchema: joi.object({
    page: joi.number().min(1).max(5).error(new Error('input is out of range')),
    perPage: joi.number().min(1).max(5).error(new Error('input is out of range'))
  }),

  ValidUserUpdateSchema: joi.object({
    email: joi.string().email().error(new Error('new email is not valid')),
    password: joi.string().regex(PASSWORD_REX).error(new Error('password is not valid')),
    discSpace: joi.number().min(0),
    userSpace: joi.number().min(0),
    avatar: joi.string(),
    is_deleted: joi.boolean().valid(false).error(new Error('you need delete user at delete endpoint'))
  })
};
