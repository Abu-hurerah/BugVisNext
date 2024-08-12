// BugManager.js
const BugHandler = require("../../handlers/BugHandlers");
const BugUtility = require("../../utils/BugUtils");
const Token = require('../../helpers/Token');
const { BugError, ErrorCodes, AuthError } = require("../../constants");
const Exception = require("../../helpers/Exception");

class BugManager {

  static async findAllBugs(req, page = 1, limit = 10) {
    const authHeader = req?.headers?.authorization;
    const sort = req?.query?.OrderBy ? req?.query?.OrderBy : "DESC";
    const user_id = await Token.getIdFromToken(authHeader);
    const searchterm = req?.query?.name;
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const offset = (page - 1) * limit; // Calculate offset

    return await BugHandler.findAllBugs(
      user_id.id,
      sortOrder,
      limit,
      offset,
      searchterm
    );
  }

  static async findAllBugsWithProjectId(req, page = 1, limit = 10) {
    const id = req?.params?.id
    const sort = req?.query?.OrderBy ? req?.query?.OrderBy : "DESC";
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const searchterm = req?.query?.searchterm;
    const offset = (page - 1) * limit; // Calculate offset

    return await BugHandler.findAllBugsWithProjectId(
      id,
      sortOrder,
      limit,
      offset,
      searchterm
    );
  }

  static async findBugById(id) {
    BugUtility.validateBugId(id);
    const bug = await BugHandler.findBugById(id);
    if (!bug) {
      throw new Exception(ErrorCodes.DOCUMENT_NOT_FOUND,BugError.MESSAGES.BUG_NOT_FOUND);
    }

    return bug;
  }

  static async createBug(req) {
    const authHeader = req?.headers?.authorization;
    if(!authHeader){
        throw new Exception(ErrorCodes.UNAUTHORIZED,AuthError.MESSAGES.AUTHHEADER_EMPTY)
    }
    const reported_by = await Token.getIdFromToken(authHeader);
    req.body.reported_by = reported_by.id;
    BugUtility.validateBugData(req.body)

    return await BugHandler.createBug(req.body);
  }

  static async updateBug(id, data) {
    BugUtility.validateBugId(id);

    return await BugHandler.updateBug(id, data);
  }
}

module.exports = BugManager;
