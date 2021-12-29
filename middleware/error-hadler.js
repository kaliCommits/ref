const CustomError = require("../errors/CustomError");

const errorHandler = (err, req, res, next) => {
  //after creating baseerror class need to check if(insatnce og that class)
  console.log("err at handler catch here", err);
  if (err instanceof CustomError) {
    res.status(err.statuscode).send(err.serializeError());
  }
  next();
};

module.exports = errorHandler;
