const { Category } = require('../models');
const { validateNameCategory } = require('./validations/validationsInputValues');

const insertCategory = async (nameCategory) => {
  const { type, message } = validateNameCategory(nameCategory);
  if (type) return { type, message };

  const category = await Category.create({ name: nameCategory });
  console.log(category);
  return { type: null, message: category };
};

module.exports = {
  insertCategory,
};
