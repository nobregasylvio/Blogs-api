const userService = require('../services/user.service');

const insertUser = async (req, res) => {
  const newUser = req.body;

  const { type, token, message } = await userService.insertUser(newUser);

  if (type) return res.status(type).json({ message });

  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const { message } = await userService.getAll();

  return res.status(200).json(message);
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getByUserId(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await userService.deleteUser(id);

  return res.status(204).json();
};

module.exports = {
  insertUser,
  getAll,
  getByUserId,
  deleteUser,
};
