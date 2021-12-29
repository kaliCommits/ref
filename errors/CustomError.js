class CustomError extends Error {
  statuscode;
  errors;
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  // serializeError()
}

module.exports = CustomError;
