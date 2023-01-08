const { verifyToken } = require('../auth/jwtFunctions');
const postService = require('../services/post.service');

const insertPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const { user: { id } } = await verifyToken(authorization);

  const { type, message } = await postService.insertPost(id, title, content, categoryIds);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  insertPost,
};
