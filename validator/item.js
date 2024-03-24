const Joi = require("joi");

const validateAddItemRequestBody = (body) => {
  const itemSchema = Joi.object({
    itemName: Joi.string()
  }).unknown();

  return Joi.attempt(body, itemSchema);
};

const validateUpdateItemRequestBody = (body) => {
  const itemSchema = Joi.object({
    itemName: Joi.string().optional()
  })
    .min(1)
    .unknown();

  return Joi.attempt(body, itemSchema);
};

module.exports = {
  validateAddItemRequestBody,
  validateUpdateItemRequestBody,
};