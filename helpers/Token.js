const jsonwebtoken = require("jsonwebtoken");
const { AUTH_SECRET_KEY, AUTH_EXPIRE_TIME } = require("../config/AuthKeys");
const { ErrorCodes, ErrorMessages, AuthError } = require("../Constants");
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
      console.error(
        `verifyToken:: Could not verify the token. token:: ${token} secretKey:: ${AUTH_SECRET_KEY}`,
        err
      );
      return false;
    }
  }

  static async getIdFromToken(header) {
    if (!header) {
      throw {
        errorCode: ErrorCodes.UNAUTHORIZED,
        message: AuthError.MESSAGES.CANNOT_FULFILL_THE_REQUEST,
      };
    }

    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw {
        errorCode: ErrorCodes.UNAUTHORIZED,
        message: AuthError.MESSAGES.CANNOT_FULFILL_THE_REQUEST,
      };
    }

    try {
      const token = parts[1];
      const decoded = jsonwebtoken.verify(token, AUTH_SECRET_KEY); // Replace 'secret' with your actual JWT secret
      return decoded.id;
    } catch (error) {
      console.error(error);
      throw {
        errorCode: ErrorCodes.UNAUTHORIZED,
        message: AuthError.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
      };
    }
  }
}

module.exports = Token;
