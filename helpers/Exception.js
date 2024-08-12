class Exception {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }
  toJson() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
module.exports = Exception;