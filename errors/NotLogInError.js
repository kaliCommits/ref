const CustomError = require("./CustomError");

class NotLogInError extends CustomError {
  statuscode = 400;

  constructor(str) {
    super(str);
    this.str = str;
    Object.setPrototypeOf(this, NotLogInError.prototype);
  }
  serializeError() {
    return [{ message: this.str }];
  }
}

module.exports = NotLogInError;
