const ErrorCodes = require('./ErrorCodes');
const ErrorMessages = require('./ErrorMessages');
const AuthError = require('./Auth');
const UserError = require('./User');
const ProjectError = require('./Project')
const ProjectAssignmentError = require('./ProjectAssignment');
const BugError = require('./Bug');
module.exports = {
  ErrorCodes,
  ErrorMessages,
  AuthError,
  UserError,
  ProjectError,
  ProjectAssignmentError,
  BugError
};
