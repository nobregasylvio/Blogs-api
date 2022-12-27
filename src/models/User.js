'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      as: 'post',
      foreignkey: 'user_id',
    });
  }

  return user;
}