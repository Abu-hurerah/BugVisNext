const { ErrorCodes, UserError } = require('../constants');
const Exception = require('../helpers/Exception');
const Validator = require('../helpers/Validators');

class UserUtility {

  static validateUserData(data) {
    Validator.validateRequiredFields(data, ['name', 'email', 'password', 'user_type']);
    const rules = [
      { field: 'name', type: 'string', nonEmpty: true },
      { field: 'email', type: 'string', nonEmpty: true },
      { field: 'password', type: 'string', nonEmpty: true },
      { field: 'user_type', enum: ['developer', 'manager', 'QA'], optional: true }
    ];

    rules.forEach(rule => {
      const value = data[rule.field];
      if (rule.type === 'string') {
        if (rule.nonEmpty && (typeof value !== 'string' || value.trim() === '')) {
          throw new Exception(ErrorCodes.NOT_IMPLEMENTED, UserError.MESSAGES.INVALID_USER_DATA);
        }
        if (typeof value !== 'string') {
          throw new Exception(ErrorCodes.NOT_IMPLEMENTED, UserError.MESSAGES.INVALID_USER_DATA);
        }
      } else if (rule.enum) {
        if (value && !rule.enum.includes(value)) {
          throw new Exception(ErrorCodes.NOT_IMPLEMENTED, UserError.MESSAGES.INVALID_USER_ROLE_TO_ADD_PERSONAL_INFO);
        }
      }
    });
    Validator.validateEmail(data.email);
  }

  static validateUserId(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Exception(ErrorCodes.NOT_IMPLEMENTED, UserError.MESSAGES.INVALID_USER_DATA);
    }
  }
}

module.exports = UserUtility;
