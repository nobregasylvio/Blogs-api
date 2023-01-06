const joi = require('joi');

const userSchema = joi.object({
  displayName: joi.string().min(8),
  email: joi.string().email(),
  password: joi.string().min(6),
});

module.exports = {
  userSchema,
};
