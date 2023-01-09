const { verifyToken } = require('../auth/jwtFunctions');
const postService = require('../services/post.service');

const getAllPost = async (_req, res) => {
  const { message } = await postService.getAllPost();

  return res.status(200).json(message);
};

const getByPostId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getByUserId(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

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
  getAllPost,
  getByPostId,
};
