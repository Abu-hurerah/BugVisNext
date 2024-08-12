const ProjectHandler = require("../../handlers/ProjectHandlers");
const ProjectUtility = require("../../utils/ProjectUtils");
const Token = require("../../helpers/Token");
const { ProjectError, ErrorCodes } = require("../../constants");
const Exception = require("../../helpers/Exception");

class ProjectManager {

  static async findAllProjects(req, page = 1, limit = 6) {
    const authHeader = req?.headers?.authorization;
    const sort = req?.query?.OrderBy ? req?.query?.OrderBy : "DESC";
    const manager_id = await Token.getIdFromToken(authHeader);
    const searchterm = req?.query?.name;
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const offset = (page - 1) * limit;

    return await ProjectHandler.findAllProjects(
      manager_id.id,
      sortOrder,
      limit,
      offset,
      searchterm
    );
  }

  static async gettaskbyproject(id) {
    ProjectUtility.validateProjectId(id);
    const project = await ProjectHandler.gettaskbyproject(id);
    if (!project) {
      throw new Exception(ErrorCodes.NO_MATCH,ProjectError.MESSAGES.PROJECT_NOT_FOUND);
    }

    return project;
  }

  static async createProject(req) {
    const authHeader = req?.headers?.authorization;
    const manager_id = await Token.getIdFromToken(authHeader);
    req.body.manager_id = manager_id.id;
    const isValid = await ProjectHandler.ValidateExistingProject(req.body.name);
    if (!isValid) {
      throw new Exception(ErrorCodes.CONFLICT_WITH_CURRENT_STATE,ProjectError.MESSAGES.PROJECT_ALREADY_EXISTS);
    }
    const project = await ProjectHandler.createProject(req.body);

    return project
  }

  static async updateProject(req) {
    const ProjectData = req.body

    return await ProjectHandler.updateProject(ProjectData);
  }
}

module.exports = ProjectManager;
