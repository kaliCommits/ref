const CustomError = require("./CustomError");

class BadRequestError extends CustomError {
  statuscode = 404;
  str;
  constructor(str) {
    super(str);
    this.str = str;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeError() {
    return [{ message: this.str }];
  }
}

module.exports = BadRequestError;
