// UserUtility.js
const Validator = require('../helpers/Validators');

class UserUtility {
    static validateUserData(data) {
        Validator.validateRequiredFields(data, ['name', 'email', 'password', 'user_type']);
        Validator.validateEmail(data.email);
    }

    static validateUserId(id) {
        Validator.validateId(id);
    }
    static validateEmail(email){
        Validator.validateEmail(email);
    }
}

module.exports = UserUtility;
