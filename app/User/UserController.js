const UserManager = require('./UserManager');
const {
  ErrorCodes,
  UserError,
  ErrorMessages,
} = require('../../constants');

class UserController {

  static async getAllUsers(req, res) {
    const { role } = req.params;
    try {
      const users = await UserManager.findAllUsers(role);
      res.status(ErrorCodes.SUCCESS).json(users);
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = await UserManager.createUser(req.body);
      res.status(ErrorCodes.SUCCESS).json(newUser);
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserManager.loginUser(email, password);
      res.status(ErrorCodes.SUCCESS).json({ user, token });
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }
}

module.exports = UserController;