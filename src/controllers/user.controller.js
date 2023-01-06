const userService = require('../services/user.service');

const insertUser = async (req, res) => {
  const newUser = req.body;

  const { type, token, message } = await userService.insertUser(newUser);

  if (type) return res.status(type).json({ message });

  return res.status(201).json({ token });
};

module.exports = {
  insertUser,
};
