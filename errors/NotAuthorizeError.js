const CustomError = require("./CustomError");

class NotAuthorizeError extends CustomError {
  statuscode = 400;
  str;
  constructor(str) {
    super(str);
    this.str = str;
    Object.setPrototypeOf(this, NotAuthorizeError.prototype);
  }
  serializeError() {
    return [{ message: this.str }];
  }
}

module.exports = NotAuthorizeError;
