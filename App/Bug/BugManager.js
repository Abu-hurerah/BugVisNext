// BugManager.js
const BugHandler = require("../../handlers/Bug");
const BugUtility = require("../../Utilities/Bug");
const Token = require('../../helpers/Token')
class BugManager {
  static async findAllBugs(req, page = 1, limit = 10) {
    const authHeader = req.headers.authorization;

    // Check for sort parameter or default to "DESC"
    const sort = req.query.OrderBy ? req.query.OrderBy : "DESC";

    // Extract the user ID from the token
    const user_id = await Token.getIdFromToken(authHeader);
    const searchterm = req.query.name;

    // Ensure sort order is valid and default to "ASC" if not
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const offset = (page - 1) * limit; // Calculate offset

    // Call the project handler with the manager ID, sortOrder, limit, and offset
    return await BugHandler.findAllBugs(
      user_id,
      sortOrder,
      limit,
      offset,
      searchterm
    );
  }
  static async findAllBugsWithProjectId(req,page=1,limit=10){
    const id = req.params.id
    const sort = req.query.OrderBy ? req.query.OrderBy : "DESC";
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const searchterm = req.query.name;
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
      throw new Error("Bug not found");
    }
    return bug;
  }

  static async createBug(req) {
    console.log("Request body:", req.body);
    // Extract the authorization header
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    // Extract the user ID from the token
    const reported_by = await Token.getIdFromToken(authHeader);
    console.log("Manager ID from token:", reported_by);

    // Set the user_id into req.body.project_id
    req.body.reported_by = reported_by;
    console.log("Request body after adding manager_id:", req.body);

    return await BugHandler.createBug(req.body);
  }
  static async findBugsByName(req, page = 1, limit = 6) {
    const authHeader = req.headers.authorization;

    // Check for sort parameter or default to "DESC"
    const sort = req.query.OrderBy ? req.query.OrderBy : "DESC";

    // Extract the user ID from the token
    const user_id = await Token.getIdFromToken(authHeader);

    // Ensure sort order is valid and default to "ASC" if not
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const offset = (page - 1) * limit; // Calculate offset
    console.log(req.params.name)
    return await BugHandler.findBugsByName(
      req.params.name,
      user_id,
      sortOrder,
      limit,
      offset
    );
  }
  static async updateBug(id, data) {
    BugUtility.validateBugId(id);
    return await BugHandler.updateBug(id, data);
  }

  static async deleteBug(id) {
    BugUtility.validateBugId(id);
    return await BugHandler.deleteBug(id);
  }

  static async deleteAllBugs() {
    return await BugHandler.deleteAllBugs();
  }
  static async UpdateStatusofBug(id, body) {
    BugUtility.validateBugId(id);
    BugUtility.CheckBodyhasStatusOnly(body);

    return await BugHandler.updateStatus(id, body);
  }
}

module.exports = BugManager;
