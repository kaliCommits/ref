const CustomError = require("./CustomError");

class ValidationReqErr extends CustomError {
  statuscode = 400;
  errors;
  constructor(error) {
    super("Req parameter is not as per aspected");
    this.errors = error;
    Object.setPrototypeOf(this, ValidationReqErr.prototype);
  }
  serializeError() {
    return this.errors.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}

module.exports = ValidationReqErr;
