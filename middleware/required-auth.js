const NotLogInError = require("../errors/NotLogInError");

const requiredAuth = (req, res, next) => {
  if (!req.currentUser) {
    console.log("error requiredAuth middleware");
    return next(new NotLogInError("please login/signup first"));
  }
  next();
};

module.exports = requiredAuth;
