const { loginService } = require('../services/login.services');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { type, message, token } = await loginService(email, password);

  if (type !== 200) {
    return res.status(type).json({ message });
  }

  return res.status(type).json({ token });
};

module.exports = { loginController };
