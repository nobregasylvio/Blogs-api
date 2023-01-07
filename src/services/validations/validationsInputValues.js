const { userSchema, nameCategorySchema } = require('./schemas');

const validateUser = (displayName, email, password) => {
  const { error } = userSchema.validate({ displayName, email, password });

  if (error) return { type: 400, message: error.message };

  return { type: null, message: '' };
};

const validateNameCategory = (name) => {
  const { error } = nameCategorySchema.validate({ name });

  if (error) return { type: 400, message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateUser,
  validateNameCategory,
};