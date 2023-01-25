const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jsonwebtoken');
const { User, Food, Category, History } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const { Op } = require("sequelize");

class Controller {
  static async addFood(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
      const addedFood = await Food.create({ name, description, price, imgUrl, authorId: req.user.id, categoryId, status: "Active"});
      await History.create({
        name: addedFood.name,
        description: `New food with id ${addedFood.id} created`,
        updatedBy: req.user.email
      })
      res.status(201).json({ addedFood });
    } catch (error) {
      next(error);
    }
  }
  static async getFood(req, res, next) {
    try {
      const food = await Food.findAll({
        include: {
          model: User,
          attributes: ["email"]
        },
        order:[
          ["id", "ASC"]
        ]
      });
      res.status(200).json(food);
    } catch (error) {
      next(error)
    }
  }
  static async getFoodDetail(req, res, next) {
    try {
      const foodDetail = await Food.findOne({
        where: {
          id: +req.params.id
        },
        include: [{
          model: User,
          attributes: ["email", "role", "phoneNumber"]
        }, Category]
      });
      if (!foodDetail) {
        throw ("Error not found");
      }
      res.status(200).json({ foodDetail });
    } catch (error) {
      next(error)
    }
  }
  static async deleteFood(req, res, next) {
    try {
      const deletedFood = await Food.findByPk(req.params.id);
      await Food.destroy({
        where: {
          id: +req.params.id
        }
      });
      if (!deletedFood) {
        throw ("Error not found");
      }
      res.status(200).json({ deletedFood });
    } catch (error) {
      next(error)
    }
  }
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        order:[
          ["id", "ASC"]
        ]
      });
      res.status(200).json(categories);
    } catch (error) {
      next(error)
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({ username, email, password, role: "Admin", phoneNumber, address });
      res.status(201).json({ 201: { id: newUser.id, email: newUser.email } })
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if(!email || !password){
        throw("bad request")
      }
      const user = await User.findOne({
        where: {
          email,
          [Op.or]: [
            { role: "Admin" },
            { role: "Staff" }
          ]
        }
      })
      if (!user) {
        throw ("Error invalid username or email or password")
      }
      const validPassword = comparePassword(password, user.password);
      if (!validPassword) {
        throw ("Error invalid username or email or password")
      }
      const payload = {
        id: user.id
      }
      res.status(200).json({ 200: { access_token: generateToken(payload) } });
    } catch (error) {
      next(error);
    }
  }
  static async addCategories(req, res, next) {
    try {
      const { name } = req.body;
      const addedCategories = await Category.create({ name });
      res.status(201).json(addedCategories);
    } catch (error) {
      next(error);
    }
  }
  static async findUserDetail(req, res, next) {
    if (req.user.username) {
      return res.status(200).json({ user: req.user.username, role: req.user.role })
    }
    return res.status(200).json({ user: req.user.email, role: req.user.role })
  }
  static async deleteCategory(req, res, next) {
    try {
      const deletedCategory = await Category.findByPk(req.params.id);
      await Category.destroy({
        where: {
          id: +req.params.id
        }
      });
      if (!deletedCategory) {
        throw ("Error not found");
      }
      res.status(200).json(deletedCategory);
    } catch (error) {
      next(error)
    }
  }
  static async googleSignIn(req, res, next) {
    try {
      const googleToken = req.headers.google_token;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: CLIENT_ID
      });
      const {email, name} = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name.toLowerCase().split(" ").join(""),
          email,
          password: email,
          role: "Staff"
        },
        hooks: false
      });
      res.status(200).json({
        "message": `User ${user.email} found`,
        "access_token": generateToken({
          id: user.id
        }),
        "user": {
          "name": user.username
        }
      });
    } catch (error) {
      next(error)
    }
  }
  static async editFood(req, res, next){
    try {
      let food = await Food.findByPk(+req.params.id);
      if(!food){
        throw("Error not found");
      }
      const { name, description, price, imgUrl, categoryId } = req.body;
      await Food.update({
        name, description, price, imgUrl, categoryId
      },{
        where:{
          id: +req.params.id
        }
      });
      food = { name, description, price, imgUrl, categoryId }
      await History.create({
        name: food.name,
        description: `Food with id ${req.params.id} updated`,
        updatedBy: req.user.email
      })
      res.status(200).json({editedFood: food})
    } catch (error) {
      next(error)
    }
  }
  static async editFoodStatus(req, res, next){
    try {
      if(req.params.status !== "Active" && req.params.status !== "Inactive" && req.params.status !== "Archived"){
        throw{message: "Invalid Status"};
      }
      let food = await Food.findByPk(+req.params.id);
      if(!food){
        throw("Error not found");
      }
      await Food.update({status:req.params.status},{
        where:{
          id: +req.params.id
        }
      })
      await History.create({
        name: food.name,
        description: `Food status with id ${req.params.id} has been updated from ${food.status} into ${req.params.status}`,
        updatedBy: req.user.email
      })
      food.status = req.params.status;
      res.status(200).json({updatedFood: food})
    } catch (error) {
      next(error);
    }
  }
  static async getHistory(req, res, next){
    try {
      const historyData = await History.findAll({
        order: [["createdAt", "DESC"]]
      });
      res.status(200).json(historyData);
    } catch (error) {
      next(error);
    }
  }
  static async getCategoryDetail(req, res, next) {
    try {
      const categoryDetail = await Category.findByPk(+req.params.id);
      if (!categoryDetail) {
        throw ("Error not found");
      }
      res.status(200).json({ categoryDetail });
    } catch (error) {
      next(error)
    }
  }
  static async editCategory(req, res, next){
    try {
      let category = await Category.findByPk(+req.params.id);
      if(!category){
        throw("Error not found");
      }
      const { name } = req.body;
      await Category.update({
        name
      },{
        where:{
          id: +req.params.id
        }
      });
      category = { name }
      await History.create({
        name: category.name,
        description: `Category with id ${req.params.id} updated`,
        updatedBy: req.user.email
      })
      res.status(200).json({editedFood: category})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;