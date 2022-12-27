'use strict';

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'category.model',
    });
    return category;
  };