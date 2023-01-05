'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: 'PostCategory',
      as: 'categories',
      foreingKey: 'postId',
      otherKey: 'categoryId'
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: 'PostCategory',
      as: 'blog_post',
      foreingKey: 'categoryId',
      otherKey: 'postId'
    });
  };

  return PostCategory;
};