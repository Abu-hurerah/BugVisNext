// UserManager.js
const UserHandler = require('../../handlers/UserHandlers');
const UserUtility = require('../../utils/UserUtils');
const {UserError, ErrorCodes} = require('../../constants');
const jwt = require("jsonwebtoken");
const { AUTH_SECRET_KEY, AUTH_EXPIRE_TIME } = require('../../config/AuthKeys');
const Exception = require('../../helpers/Exception');

class UserManager {
  
  static async findAllUsers(role) {
    
    return UserHandler.findAllUsers(role);
  }

  static async createUser(data) {
    UserUtility.validateUserData(data);
    const existingUser = await UserHandler.findUserByEmail(data.email);
    if (existingUser) {
      throw new Exception(ErrorCodes.CONFLICT_WITH_CURRENT_STATE, UserError.MESSAGES.USER_ALREADY_EXIST);
    }
    
    return await UserHandler.createUser(data);
  }

  static async loginUser(email, password) {
    const user = await UserHandler.findUserByEmail(email);
    if (!user) {
      console.log()
      throw new Exception(ErrorCodes.DOCUMENT_NOT_FOUND, UserError.MESSAGES.INVALID_EMAIL);
    }
    const isMatch = await UserHandler.verifyPassword(user, password);
    if (!isMatch) {
      throw new Exception(ErrorCodes.DOCUMENT_NOT_FOUND,UserError.MESSAGES.INVALID_PASSWORD);
    }
    const token = jwt.sign(
      { id: user.user_id, user_type: user.user_type },
      AUTH_SECRET_KEY,
      { expiresIn: AUTH_EXPIRE_TIME }
    );
    
    return { user, token };
  }
}

module.exports = UserManager;
