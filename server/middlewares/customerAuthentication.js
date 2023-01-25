const {verifyToken} = require('../helpers/jsonwebtoken');
const {User} = require('../models');

const customerAuthentication = async (req, res, next)=>{
  try {
    const {access_token} = req.headers;
    if(!access_token){
      throw{name:"invalid token"};
    }
    const payload = verifyToken(access_token);
    const user = await User.findOne({
      where: {
        id: payload.id,
        role: "Customer"
      }
    })
    if(!user){
      throw{name:"invalid token"};
    }
    req.user = {
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {customerAuthentication};