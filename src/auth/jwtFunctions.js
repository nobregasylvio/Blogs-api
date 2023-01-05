const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '5h',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

module.exports = {
  createToken,
};
