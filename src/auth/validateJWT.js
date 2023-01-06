const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);

    const { type, message } = await userService.getByUserId(decoded.data.id);

    if (type) {
      return res.status(type).json({ message });
    }

    req.user = message.dataValues;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateJWT,
};
