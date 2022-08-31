const Joi = require('joi');

const email = Joi.string().email();

const recoveryEmailSchema = Joi.object({
  email: email.required(),
});

module.exports = {
  recoveryEmailSchema,
};
