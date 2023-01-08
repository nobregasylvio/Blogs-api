const { Category, BlogPost, PostCategory } = require('../models');

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

module.exports = {
  insertPost,
};