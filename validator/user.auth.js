const Joi = require("joi");

const validateUserAuthLoginRequestBody = (body) => {
  const userSchema = Joi.object({
    email: Joi.string().regex(
      new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")
    ),
    password: Joi.string().min(4).max(8),
  }).unknown();

  return Joi.attempt(body, userSchema);
};

module.exports = {
    validateUserAuthLoginRequestBody
}