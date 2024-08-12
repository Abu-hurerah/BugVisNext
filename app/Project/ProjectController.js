const ProjectManager = require("./ProjectManager");
const { ErrorCodes, ProjectError, ErrorMessages } = require("../../constants");

class ProjectController {

  static async getAllProjects(req, res) {
    try {
      const page = parseInt(req?.query?.page) || 1;
      const limit = 6;
      const projects = await ProjectManager.findAllProjects(req, page, limit);
      if (projects?.rows?.length) {
        res.status(ErrorCodes.SUCCESS).json({
          data: projects.rows,
          totalItems: projects.count,
          totalPages: Math.ceil(projects.count / limit),
          currentPage: page,
        });
      } else {
        res.status(ErrorCodes.SUCCESS).json({
          message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
          data: [],
          totalItems: 0,
          totalPages: 0,
          currentPage: page,
        });
      }
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async gettaskbyproject(req, res) {
    try {
      const project = await ProjectManager.gettaskbyproject(req.params.id);
      if (project) {
        res.status(ErrorCodes.SUCCESS).json(project);
      } else {
        res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
          message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
        });
      }
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async createProject(req, res) {
    try {
      const newProject = await ProjectManager.createProject(req, res);
      res.status(ErrorCodes.SUCCESS).json(newProject);
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async updateProject(req, res) {
    try {
      const updated = await ProjectManager.updateProject(req);
      if (updated) {
        res
          .status(ErrorCodes.SUCCESS)
          .send({ message: ProjectError.MESSAGES.PROJECT_UPDATED_SUCCESS });
      } else {
        res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
          message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
        });
      }
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }
}

module.exports = ProjectController;
