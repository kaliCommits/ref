const Jwt = require("jsonwebtoken");

const currentUser = (req, res, next) => {
  if (!req.session || !req.session.jwt) {
    console.log("bypass");
    return next();
  }
  try {
    const payload = Jwt.verify(req.session.jwt, "asdf");
    req.currentUser = payload;
    console.log(req.currentUser);
  } catch (err) {
    console.log("error at current-user middleware", err);
  }
  next();
};

module.exports = currentUser;
