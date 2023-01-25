const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jsonwebtoken');
const { User, Food, Category, Favourite } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const { Op } = require("sequelize");

class CustomerController{
  static async customerRegister(req, res, next){
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({ username, email, password, role: "Customer", phoneNumber, address });
      res.status(201).json({id: newUser.id, email: newUser.email })
    } catch (error) {
      next(error);
    }
  }
  static async customerLogin(req, res, next){
    try {
      const { email, password } = req.body;
      if(!email || !password){
        throw("bad request")
      }
      const user = await User.findOne({
        where: {
          email,
          role: "Customer"
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
      res.status(200).json({ access_token: generateToken(payload) });
    } catch (error) {
      next(error);
    }
  }
  static async customerGoogleSignIn(req, res, next){
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
          role: "Customer"
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
  static async getFilteredFood(req, res, next){
    try {
      const keyword = req.query.filterBy;
      const categoryId = req.query.categoryId;
      const page = req.query.page;
      let options = {
        include: {
          model: User,
          attributes: ["email"]
        },
        where: {
          status: "Active"
        },
        order: [
          ["id", "ASC"]
        ]
      };
      if(page){
        options.limit = 9;
        options.offset = (page-1)*9
      }
      if(keyword){
        options.where = {
          ...options.where,
          name: {
            [Op.iLike]: `%${keyword}%`
          }
        };
      }
      if(categoryId){
        options.where = {
          ...options.where,
          categoryId: categoryId
        };
      }
      const food = await Food.findAll(options);
      delete options.limit;
      delete options.offset;
      const totalFood = await Food.count(options);
      res.status(200).json({food, totalFood});
    } catch (error) {
      next(error)
    }
  }
  static async getCustomerDetail(req, res, next) {
    if (req.user.username) {
      return res.status(200).json({ user: req.user.username, role: req.user.role })
    }
    return res.status(200).json({ user: req.user.email, role: req.user.role })
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
      res.status(200).json(foodDetail);
    } catch (error) {
      next(error)
    }
  }
  static async getCustomerFavourite(req, res, next){
    try {
      const customerFavourite = await Favourite.findAll({
        where: {
          UserId: req.user.id
        },
        include: [{
          model: User,
          attributes: ["email", "role", "phoneNumber"]
        }, Food]
      })
      res.status(200).json(customerFavourite);
    } catch (error) {
      next(error);
    }
  }
  static async addCustomerFavourite(req, res, next){
    try {
      const isAlreadyFavourite = await Favourite.findOne({
        where: {
          UserId: req.user.id,
          FoodId : req.params.id
        }
      })
      if(isAlreadyFavourite){
        throw("Already exist")
      }
      const foodToBeFavourite = await Food.findByPk(req.params.id);
      if(!foodToBeFavourite){
        throw("Error not found")
      }
      const addedFavourite = await Favourite.create({
        UserId: req.user.id,
        FoodId : req.params.id
      })
      res.status(200).json(addedFavourite);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCustomerFavourite(req, res, next){
    try {
      const favouriteFood = await Favourite.findByPk(req.params.id);
      if(!favouriteFood){
        throw("Error not found");
      }
      await Favourite.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({message: "Successfully remove food from favourites"})
    } catch (error) {
      next(error)
    }
  }
  static async getCategories(req, res, next){
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController