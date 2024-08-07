// ProjectManager.js
const ProjectHandler = require("../../handlers/Project");
const ProjectUtility = require("../../Utilities/Project");
const Token = require("../../helpers/Token");
class ProjectManager {
  static async findAllProjects(req, page = 1, limit = 6) {
    const authHeader = req.headers.authorization;

    // Check for sort parameter or default to "DESC"
    const sort = req.query.OrderBy ? req.query.OrderBy : "DESC";

    // Extract the user ID from the token
    const manager_id = await Token.getIdFromToken(authHeader);
    const searchterm = req.query.name;
    // Ensure sort order is valid and default to "ASC" if not
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const offset = (page - 1) * limit; // Calculate offset

    // Call the project handler with the manager ID, sortOrder, limit, and offset
    return await ProjectHandler.findAllProjects(
      manager_id,
      sortOrder,
      limit,
      offset,
      searchterm
    );
  }

  static async findProjectById(id) {
    ProjectUtility.validateProjectId(id);
    const project = await ProjectHandler.findProjectById(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }
  static async gettaskbyproject(id) {
    ProjectUtility.validateProjectId(id);
    const project = await ProjectHandler.gettaskbyproject(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }
  static async findProjectsByName(req, page = 1, limit = 6) {
    const authHeader = req.headers.authorization;

    // Check for sort parameter or default to "DESC"
    const sort = req.query.OrderBy ? req.query.OrderBy : "DESC";

    // Extract the user ID from the token
    const manager_id = await Token.getIdFromToken(authHeader);

    // Ensure sort order is valid and default to "ASC" if not
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const offset = (page - 1) * limit; // Calculate offset
    console.log(req.params.name)
    return await ProjectHandler.findProjectsByName(
      req.params.name,
      manager_id,
      sortOrder,
      limit,
      offset
    );
  }

  static async createProject(req, res) {
    try {
      console.log("Request body:", req.body);
      // Extract the authorization header
      const authHeader = req.headers.authorization;
      console.log("Authorization header:", authHeader);
  
      // Extract the user ID from the token
      const manager_id = await Token.getIdFromToken(authHeader);
      console.log("Manager ID from token:", manager_id);
  
      // Set the user_id into req.body.project_id
      req.body.manager_id = manager_id;
      console.log("Request body after adding manager_id:", req.body);
  
      // Validate the project data
      const isValid = await ProjectHandler.ValidateExistingProject(req.body.name);
      console.log("Status of Validation: ", isValid);
      if (!isValid) {
        throw new Error("Project already exists");
      }
  
      // Call the handler to create the project
      const project = await ProjectHandler.createProject(req.body);
      console.log("Project created successfully:", project);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error in createProject:", error);
      if (error.message === "Project already exists") {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({
          message: `createProject:: Failed to create project. ${error.message}`
        });
      }
    }
  }
  static async updateProject(id, data) {
    ProjectUtility.validateProjectId(id);
    ProjectUtility.validateProjectData(data);
    return await ProjectHandler.updateProject(id, data);
  }

  static async deleteProject(id) {
    ProjectUtility.validateProjectId(id);
    return await ProjectHandler.deleteProject(id);
  }

  static async deleteAllProjects() {
    return await ProjectHandler.deleteAllProjects();
  }
  static async AssignQAToProject(req) {
    return await ProjectHandler.AssignQAToProject(req);
  }
  static async AssigndevToProject(req) {
    return await ProjectHandler.AssigndevToProject(req);
  }
}

module.exports = ProjectManager;
