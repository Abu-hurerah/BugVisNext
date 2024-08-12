const jwt = require('jsonwebtoken');
const UserHandler = require('../handlers/UserHandlers');
const { ErrorCodes, AuthError } = require('../constants');
const { AUTH_SECRET_KEY } = require("../config/AuthKeys")

class AuthMiddleware {

  static async authorizeManager(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(ErrorCodes.UNAUTHORIZED).send({ message: AuthError.MESSAGES.MISSING_AUTH_HEADER });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(ErrorCodes.UNAUTHORIZED).send({ message: AuthError.MESSAGES.MISSING_TOKEN });
    }
    try {
      const decoded = jwt.verify(token, AUTH_SECRET_KEY);
      const user = await UserHandler.findUserById(decoded.id);
      if (!user) {
        return res.status(ErrorCodes.NOT_FOUND).send({ message: AuthError.MESSAGES.USER_NOT_FOUND });
      }
      if (user.user_type !== 'manager') {
        return res.status(ErrorCodes.FORBIDDEN).send({ message: AuthError.MESSAGES.FORBIDDEN });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(ErrorCodes.FORBIDDEN).send({ message: AuthError.MESSAGES.INVALID_TOKEN });
    }
  }

  static async authorizeQA(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(ErrorCodes.UNAUTHORIZED).send({ message: AuthError.MESSAGES.MISSING_AUTH_HEADER });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(ErrorCodes.UNAUTHORIZED).send({ message: AuthError.MESSAGES.MISSING_TOKEN });
    }

    try {
      const decoded = jwt.verify(token, AUTH_SECRET_KEY);
      console.log(decoded)
      const user = await UserHandler.findUserById(decoded.id);

      if (!user) {
        return res.status(ErrorCodes.NOT_FOUND).send({ message: AuthError.MESSAGES.USER_NOT_FOUND });
      }

      if (user.user_type !== 'QA') {
        return res.status(ErrorCodes.FORBIDDEN).send({ message: AuthError.MESSAGES.FORBIDDEN });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(ErrorCodes.FORBIDDEN).send({ message: AuthError.MESSAGES.INVALID_TOKEN });
    }
  }

  static async authorizeAssignedProject(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(ErrorCodes.UNAUTHORIZED).send({ message: AuthError.MESSAGES.MISSING_AUTH_HEADER });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(ErrorCodes.UNAUTHORIZED).send({ message: AuthError.MESSAGES.MISSING_TOKEN });
    }
    try {
      const decoded = jwt.verify(token, AUTH_SECRET_KEY);
      const user = await UserHandler.findUserById(decoded.id);
      if (!user) {
        return res.status(ErrorCodes.NOT_FOUND).send({ message: AuthError.MESSAGES.USER_NOT_FOUND });
      }
      const projectId = req.params.id;
      const project = await ProjectHandler.findProjectById(projectId);
      if (!project) {
        return res.status(ErrorCodes.NOT_FOUND).send({ message: ProjectError.MESSAGES.PROJECT_NOT_FOUND });
      }
      if (project.manager_id !== user.id) {
        return res.status(ErrorCodes.FORBIDDEN).send({ message: AuthError.MESSAGES.FORBIDDEN });
      }
      req.user = user;
      req.project = project;
      next();
    } catch (error) {
      console.error(error);
      return res.status(ErrorCodes.FORBIDDEN).send({ message: AuthError.MESSAGES.INVALID_TOKEN });
    }
  }
}

module.exports = AuthMiddleware;
