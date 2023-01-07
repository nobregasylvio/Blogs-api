const { validateUser } = require('./validations/validationsInputValues');
const { User } = require('../models');
const { createToken } = require('../auth/jwtFunctions');

const insertUser = async ({ displayName, email, password, image = null }) => {
  const { type, message } = validateUser(displayName, email, password);
  if (type) return { type, message };

  const [user, created] = await User.findOrCreate({
    where: { email },
    attributes: { exclude: ['password'] },
    defaults: { displayName, email, password, image },
  });

  if (!created) return { type: 409, message: 'User already registered' };
  
  const token = createToken(user);

  return { token };
};

const getByUserId = async (userId) => {
  const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
  if (!user) return { type: 404, message: 'User does not exist' };
  return { type: null, message: user };
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { type: null, message: users };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id }, force: true });
};

module.exports = {
  insertUser,
  getByUserId,
  getAll,
  deleteUser,
};
