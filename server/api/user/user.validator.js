const joi = require("joi");

const { EMAIL_REX, PASSWORD_REX } = require("../../configs/regax.js");

module.exports = {
  ValidUserSchema: joi.object({
    email: joi
      .string()
      .required()
      .email()
      .error(new Error("email is not valid")),
    password: joi
      .string()
      .required()
      .regex(PASSWORD_REX)
      .error(new Error("password is not valid")),
    discSpace: joi.number().min(0),
    userSpace: joi.number().min(0),
    avatar: joi.string(),
    is_deleted: joi.boolean(),
  }),
};
