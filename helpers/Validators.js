const { ErrorCodes } = require("../constants");
const GENERAL_ERROR = require("../constants/GeneralConstants");
const Exception = require("./Exception");

class Validator {
  
  static validateRequiredFields(data, fields) {
    const missingFields = fields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Exception(ErrorCodes.CONFLICT_WITH_CURRENT_STATE,GENERAL_ERROR.MESSAGES.MISSING_FIELD);
    }
  }

  static validateId(id) {
    if (!id || isNaN(parseInt(id))) {
      throw new Exception(ErrorCodes.CONFLICT_WITH_CURRENT_STATE,GENERAL_ERROR.MESSAGES.MISSING_FIELD);
    }
  }
  
  static validateEmail(email) {
    console.log(email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Exception(ErrorCodes.CONFLICT_WITH_CURRENT_STATE,GENERAL_ERROR.MESSAGES.MISSING_FIELD);
    }
  }
}

module.exports = Validator;
