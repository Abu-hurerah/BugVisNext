const jsonwebtoken = require("jsonwebtoken");
const { AUTH_SECRET_KEY, AUTH_EXPIRE_TIME, TOKEN_TYPE } = require("../config/AuthKeys");
const { ErrorCodes, AuthError, ErrorMessages, } = require("../constants");
const Exception = require("./Exception");

class Token {

  static getLoginToken(user) {
    return jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
      },
      AUTH_SECRET_KEY,
      {
        expiresIn: AUTH_EXPIRE_TIME,
      }
    );
  }

  static getRefreshToken(user) {
    return jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
      },
      AUTH_SECRET_KEY,
      {
        expiresIn: AUTH_EXPIRE_TIME,
      }
    );
  }

  static verifyToken(token) {
    try {
      return jsonwebtoken.verify(token, AUTH_SECRET_KEY);
    } catch (err) {
      throw new Exception(ErrorCodes.INVALID_TOKEN, ErrorMessages.MESSAGES.CANNOT_FULFILL_THE_REQUEST);
    }
  }

  static async getIdFromToken(header) {
    if (!header) {
      throw new Exception(ErrorCodes.UNAUTHORIZED, AuthError.MESSAGES.CANNOT_FULFILL_THE_REQUEST);
    }
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== TOKEN_TYPE) {
      throw new Exception(ErrorCodes.UNAUTHORIZED, AuthError.MESSAGES.CANNOT_FULFILL_THE_REQUEST);
    }
    try {
      const token = parts[1];
      const decoded = jsonwebtoken.verify(token, AUTH_SECRET_KEY);
      return decoded;
    } catch (error) {
      console.error(error);
      throw new Exception(ErrorCodes.UNAUTHORIZED, AuthError.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
      );
    }
  }
}

module.exports = Token;
