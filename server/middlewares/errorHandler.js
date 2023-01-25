const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
  if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
    code = 400;
    message = err.errors.map(error=>error.message);
  }
  else if(err === "Error not found"){
    code = 404;
    message = err;
  }
  else if(err === "Error invalid username or email or password"){
    code = 401;
    message = err;
  }
  else if(err.name === "invalid token" || err.name === "JsonWebTokenError"){
    code = 401;
    message = err;
  }
  else if(err.name === "Forbidden"){
    code = 403;
    message = "You have no access!";
  }
  else if(err.message === "Invalid Status"){
    code = 400;
    message = err.message;
  }
  else if(err === "bad request"){
    code = 400;
    message = "Email or password cannot be empty";
  }
  else if(err === "Already exist"){
    code = 400;
    message = "Already exist";
  }
  res.status(code).json({message});
}

module.exports = errorHandler;