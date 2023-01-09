const { Category, BlogPost, PostCategory, User } = require('../models');

const getAllPost = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return { type: null, message: posts };
};

const getByUserId = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!post) return { type: 404, message: 'Post does not exist' };

  return { type: null, message: post };
};

const isCategoryValid = async (categoryIds) => {
  const allCategories = await Category.findAll();
  const categoriesExist = categoryIds.map((e) => allCategories
    .some(({ id }) => id === e)).every((e) => e === true);
  
  return categoriesExist;
};

const isValid = (title, content, categoryIds) => title && content && categoryIds;

const insertPost = async (id, title, content, categoryIds) => {
  if (!isValid(title, content, categoryIds)) {
    return { type: 400, message: 'Some required fields are missing' };
  }

  const isValidCategory = await isCategoryValid(categoryIds);
  if (!isValidCategory) return { type: 400, message: 'one or more "categoryIds" not found' };

  const { dataValues } = await BlogPost.create({ title, content, userId: id });
  const postCategory = categoryIds.map((e) => ({ categoryId: e, postId: dataValues.id }));
  await PostCategory.bulkCreate(postCategory);
  
  return { type: null, message: dataValues };
};

const deleteByPostId = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return { type: 404, message: 'Post does not exist' };
  if (userId !== post.userId) return { type: 401, message: 'Unauthorized user' };

  await post.destroy();
  
  return { type: null, message: '' };
};

module.exports = {
  insertPost,
  getAllPost,
  getByUserId,
  deleteByPostId,
};