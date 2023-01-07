const categoryService = require('../services/category.service');

const insertCategory = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await categoryService.insertCategory(name);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await categoryService.getAll();

  return res.status(200).json(message);
};

module.exports = {
  insertCategory,
  getAll,
};
