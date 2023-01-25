'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favourite.belongsTo(models.User);
      Favourite.belongsTo(models.Food);
    }
  }
  Favourite.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User is required'
        },
        notEmpty: {
          msg: 'User is required'
        }
      }
    },
    FoodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Food is required'
        },
        notEmpty: {
          msg: 'Food is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};