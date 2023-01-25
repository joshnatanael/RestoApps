const {Food} = require('../models');

const authorization = async (req, res, next)=>{
  try {
    if(req.user.role !== "Admin"){
      const {id} = req.params;
      const food = await Food.findByPk(id);
      if(!food){
        throw("Error not found");
      }
      if(food.authorId !== req.user.id){
        throw{name:"Forbidden"}
      }
      next();
    }
    else{
      next();
    }
  } catch (error) {
    next(error);
  }
}
const updateStatusAuthorization = async (req, res, next)=>{
  try {
    if(req.user.role !== "Admin"){
      throw{name:"Forbidden"}
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {authorization, updateStatusAuthorization};