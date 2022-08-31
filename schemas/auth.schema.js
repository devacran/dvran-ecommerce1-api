const Joi = require('joi');

const email = Joi.string().email();
const token = Joi.string();
const password = Joi.string().min(8);

const recoveryEmailSchema = Joi.object({
  email: email.required(),
});
const resetPasswordSchema = Joi.object({
  token: token.required(),
  password: password.required(),
});
module.exports = {
  recoveryEmailSchema,
  resetPasswordSchema,
};
