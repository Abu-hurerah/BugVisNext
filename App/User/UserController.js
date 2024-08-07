// UserController.js
const UserManager = require('./UserManager');
const {
    ErrorCodes,
    UserError,
    ErrorMessages,
    Auth,
} = require('../../Constants');
const jwt = require('jsonwebtoken')
class UserController {
    static async getAllUsers(req, res) {
        const { role } = req.params;
        try {
            const users = await UserManager.findAllUsers(role);
            res.status(ErrorCodes.SUCCESS).json(users);
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getUsersByName(req, res) {
        try {
            const users = await UserManager.findUsersByName(req.params.name);
            if (users.length > 0) {
                res.status(ErrorCodes.SUCCESS).json(users);
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: UserError.MESSAGES.USER_DOES_NOT_EXIST,
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ErrorMessages.MESSAGES.SOMETHING_WENT_WRONG,
            });
        }
    }

    static async createUser(req, res) {
        try {
            const newUser = await UserManager.createUser(req.body);
            res.status(ErrorCodes.SUCCESS).json(newUser);
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({ message: error.message || UserError.MESSAGES.SIGN_UP_FAILED });
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            console.log("Email",email)
            const { user, token } = await UserManager.loginUser(email, password);
            res.status(ErrorCodes.SUCCESS).json({ user, token });
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({ message: error.message || UserError.MESSAGES.LOGIN_FAILED });
        }
    }

    static async deleteUser(req, res) {
        try {
            const header = req.headers.authorization;
            const userId = await UserManager.getIdFromToken(header);
            const deleted = await UserManager.deleteUser(userId);
            if (deleted) {
                res.status(ErrorCodes.SUCCESS).send({ message: "User was deleted successfully!" });
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({ message: UserError.MESSAGES.USER_DOES_NOT_EXIST });
            }
        } catch (error) {
            res.status(error.errorCode || ErrorCodes.INTERNAL_SERVER_ERROR).send({ message: error.message || UserError.MESSAGES.INVALID_AUTHENTICATION_TOKEN });
        }
    }
    static async updateUser(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "secret");
            const updated = await UserManager.updateUser(decoded.id, req.body);

            if (updated[0] > 0) {
                res.status(ErrorCodes.SUCCESS).send({ message: "User was updated successfully." });
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({ message: UserError.MESSAGES.USER_DOES_NOT_EXIST });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: UserError.MESSAGES.UPDATING_USER_DATA_FAILED
            });
        }
    }
}

module.exports = UserController;
