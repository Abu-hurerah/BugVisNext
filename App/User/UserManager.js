// UserManager.js
const UserHandler = require('../../handlers/User');
const UserUtility = require('../../Utilities/User');
const jwt = require("jsonwebtoken");
const {AUTH_SECRET_KEY,AUTH_EXPIRE_TIME} = require('../../config/AuthKeys')
class UserManager {
    static async findAllUsers(role) {
        return UserHandler.findAllUsers(role);
    }

    static async findUsersByName(nameSubstring) {
        return await UserHandler.findUsersByName(nameSubstring);
    }

    static async createUser(data) {
        UserUtility.validateUserData(data);
        const existingUser = await UserHandler.findUserByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }
        return await UserHandler.createUser(data);
    }

    static async updateUser(id, data) {
        return await UserHandler.updateUser(id, data);
    }

    static async deleteUser(id) {

        return await UserHandler.deleteUser(id);
    }
    static async getIdFromToken(header) {
        if (!header) {
            throw { errorCode: ErrorCodes.UNAUTHORIZED, message: AuthError.MESSAGES.CANNOT_FULFILL_THE_REQUEST };
        }

        const parts = header.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw { errorCode: ErrorCodes.UNAUTHORIZED, message: AuthError.MESSAGES.CANNOT_FULFILL_THE_REQUEST };
        }

        try {
            const token = parts[1];
            const decoded = jwt.verify(token, AUTH_SECRET_KEY); // Replace 'secret' with your actual JWT secret
            return decoded.id;
        } catch (error) {
            console.error(error);
            throw { errorCode: ErrorCodes.UNAUTHORIZED, message: AuthError.MESSAGES.INVALID_AUTHENTICATION_TOKEN };
        }
    }


    static async loginUser(email, password) {
        console.log(email)
        UserUtility.validateEmail(email);
        const user = await UserHandler.findUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await UserHandler.verifyPassword(user, password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
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
