const { createToken } = require('../auth/jwtFunctions');
const { User } = require('../models');

const isValidLogin = (email, password) => email && password;

const loginService = async (email, password) => {
  if (!isValidLogin(email, password)) {
    return { type: 400, message: 'Some required fields are missing' };
  }
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { type: 400, message: 'Invalid fields' };

  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);

  return { type: null, token };
};

module.exports = {
  loginService,
};
