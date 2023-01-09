const { Category } = require('../models');
const { validateNameCategory } = require('./validations/validationsInputValues');

const insertCategory = async (nameCategory) => {
  const { type, message } = validateNameCategory(nameCategory);
  if (type) return { type, message };

  const category = await Category.create({ name: nameCategory });
  return { type: null, message: category };
};

const getAll = async () => {
  const categories = await Category.findAll();

  return { type: null, message: categories };
};

module.exports = {
  insertCategory,
  getAll,
};
