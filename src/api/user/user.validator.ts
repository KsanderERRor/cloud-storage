import joi from 'joi';

import { PASSWORD_REX } from '../../configs/regax';

export default {
  ValidUserSchema: joi.object({
    email: joi.string().required().email().error(new Error('email is not valid')),
    password: joi.string().required().regex(PASSWORD_REX).error(new Error('password is not valid')),
    discSpace: joi.number().min(0).max(1000).error(new Error('input is out of range')),
    userSpace: joi.number().min(0).max(1000).error(new Error('input is out of range')),
    avatar: joi.string().error(new Error('input is not falid of type')),
    is_deleted: joi.boolean().valid(false).error(new Error('input is not falid of type'))
  }),

  ValidQuerySchema: joi.object({
    page: joi.number().min(1).max(5).error(new Error('input is out of range')),
    perPage: joi.number().min(1).max(5).error(new Error('input is out of range')),
    email: joi.string().email().error(new Error('email is not valid')),
    discSpace_gte: joi.number().min(0).max(1000).error(new Error('input is out of range')),
    discSpace_lte: joi.number().min(0).max(1000).error(new Error('input is out of range')),
    userSpace_gte: joi.number().min(0).max(1000).error(new Error('input is out of range')),
    userSpace_lte: joi.number().min(0).max(1000).error(new Error('input is out of range'))
  }),

  ValidUserUpdateSchema: joi.object({
    email: joi.string().email().error(new Error('new email is not valid')),
    password: joi.string().regex(PASSWORD_REX).error(new Error('new password is not valid')),
    discSpace: joi.number().min(0).max(1000).error(new Error('input is out of range')),
    userSpace: joi.number().min(0).max(1000).error(new Error('input is out of range')),
    avatar: joi.string().error(new Error('input is not falid of type')),
    is_deleted: joi.boolean().valid(false).error(new Error('you need delete user at delete endpoint'))
  })
};
