const { validationResult } = require("express-validator");
const ValidationReqErr = require("../errors/validationReqErr");

const requestValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("error occued in req validatin");
    console.log(errors);
    throw new ValidationReqErr(errors);
  }
  next();
};

module.exports = requestValidation;
