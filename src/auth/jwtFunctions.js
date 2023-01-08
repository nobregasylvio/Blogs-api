const jwt = require('jsonwebtoken');
const { User } = require('../models');
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

const verifyToken = async (authorization) => {
  const { data } = jwt.verify(authorization, secret);
  const user = await User.findOne({ where: { email: data.email } });
  return { data, user };
};

module.exports = {
  createToken,
  verifyToken,
};
