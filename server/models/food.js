'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsTo(models.User, {
        foreignKey: "authorId"
      });
      Food.belongsTo(models.Category, {
        foreignKey: "categoryId"
      });
      Food.hasMany(models.Favourite);
    }
  }
  Food.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Food name is required'
        },
        notEmpty: {
          msg: 'Food name is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price is required'
        },
        min:{
          args: 10000,
          msg: "Price must be higher than 10.000"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image Url is required'
        },
        notEmpty: {
          msg: 'Image Url is required'
        }
      }
    },
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};