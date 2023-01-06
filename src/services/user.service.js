const { validateUser } = require('./validations/validationsInputValues');
const { User } = require('../models');
const { createToken } = require('../auth/jwtFunctions');

const insertUser = async ({ displayName, email, password, image = null }) => {
  const { type, message } = validateUser(displayName, email, password);
  if (type) return { type, message };

  const [user, created] = await User.findOrCreate({
    where: { email },
    attributes: {
      exclude: ['password'],
    },
    defaults: { displayName, email, password, image },
  });

  if (!created) return { type: 409, message: 'User already registered' };
  
  const token = createToken(user);

  return { token };
};

module.exports = {
  insertUser,
};
