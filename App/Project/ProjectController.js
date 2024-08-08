// ProjectController.js
const ProjectManager = require("./ProjectManager");
const { ErrorCodes, ProjectError, ErrorMessages } = require("../../Constants");
const { query } = require("express");

class ProjectController {
    static async getAllProjects(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Default to first page if not specified
            const limit = 6; // Number of items per page
            const projects = await ProjectManager.findAllProjects(req, page, limit);
    
            if (projects.rows.length > 0) {
                res.status(ErrorCodes.SUCCESS).json({
                    data: projects.rows,
                    totalItems: projects.count,
                    totalPages: Math.ceil(projects.count / limit),
                    currentPage: page,
                });
            } else {
                res.status(ErrorCodes.SUCCESS).json({
                    message: "No Project Found",
                    data: [],
                    totalItems: 0,
                    totalPages: 0,
                    currentPage: page,
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR,
            });
        }
    }
    
    static async getProjectById(req, res) {
        try {
            console.log(req.params.id);
            const project = await ProjectManager.findProjectById(req.params.id);
            if (project) {
                res.status(ErrorCodes.SUCCESS).json(project);
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(ErrorCodes.BAD_REQUEST).send({
                message:
                    error.message || ProjectError.MESSAGES.PROJECT_DATA_FETCH_FAILED,
            });
        }
    }
    static async gettaskbyproject(req, res) {
        try {
            console.log(req.params.id);
            const project = await ProjectManager.gettaskbyproject(req.params.id);
            if (project) {
                res.status(ErrorCodes.SUCCESS).json(project);
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(ErrorCodes.BAD_REQUEST).send({
                message:
                    error.message || ProjectError.MESSAGES.PROJECT_DATA_FETCH_FAILED,
            });
        }
    }
    static async getProjectsByName(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Default to first page if not specified
            const limit = 6; // Number of items per page
            const projects = await ProjectManager.findProjectsByName(
                req,
                page,
                limit
            );

            if (projects.rows.length > 0) {
                res.status(ErrorCodes.SUCCESS).json(projects);
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ErrorMessages.MESSAGES.SOMETHING_WENT_WRONG,
            });
        }
    }

    static async createProject(req, res) {
        try {
            const newProject = await ProjectManager.createProject(req,res);
            res.status(ErrorCodes.SUCCESS).json(newProject);
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ProjectError.MESSAGES.PROJECT_CREATION_FAILED,
            });
        }
    }

    static async updateProject(req, res) {
        try {
            const updated = await ProjectManager.updateProject(
                req
            );
            if (updated) {
                res
                    .status(ErrorCodes.SUCCESS)
                    .send({ message: "Project was updated successfully." });
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ProjectError.MESSAGES.PROJECT_UPDATE_FAILED,
            });
        }
    }

    static async deleteProject(req, res) {
        try {
            const deleted = await ProjectManager.deleteProject(req.params.id);
            if (deleted) {
                res
                    .status(ErrorCodes.SUCCESS)
                    .send({ message: "Project was deleted successfully!" });
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ProjectError.MESSAGES.PROJECT_DELETION_FAILED,
            });
        }
    }

    static async deleteAllProjects(req, res) {
        try {
            const deleted = await ProjectManager.deleteAllProjects();
            res.status(ErrorCodes.SUCCESS).send({
                message: `${deleted} Projects were deleted successfully!`,
            });
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message:
                    error.message || ProjectError.MESSAGES.PROJECTS_DELETION_FAILED,
            });
        }
    }
    static async AssignQAToProject(req, res) {
        try {
            const deleted = await ProjectManager.AssignQAToProject(req);
            res.status(ErrorCodes.SUCCESS).send({
                message: `${deleted} QA Assigned to Project!`,
            });
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message:
                    error.message || ProjectError.MESSAGES.PROJECTS_DELETION_FAILED,
            });
        }
    }
    static async AssigndevToProject(req, res) {
        try {
            const deleted = await ProjectManager.AssigndevToProject(req);
            res.status(ErrorCodes.SUCCESS).send({
                message: `${deleted} Dev Assigned to Projecr!`,
            });
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message:
                    error.message || ProjectError.MESSAGES.PROJECTS_DELETION_FAILED,
            });
        }
    }
   
}

module.exports = ProjectController;
