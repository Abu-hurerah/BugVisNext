// ProjectAssignmentController.js
const ProjectAssignmentManager = require('./ProjectAssignManager');
const {
    ErrorCodes,
    ProjectAssignmentError,
    ErrorMessages,
} = require('../../Constants');

class ProjectAssignmentController {
    static async getAllProjectAssignments(req, res) {
        try {
            const projectAssignments = await ProjectAssignmentManager.findAllProjectAssignments();
            if (projectAssignments.length > 0) {
                res.status(ErrorCodes.SUCCESS).json(projectAssignments);
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectAssignmentError.MESSAGES.NO_PROJECT_ASSIGNMENTS_FOUND
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
            });
        }
    }

    static async getProjectAssignmentById(req, res) {
        try {
            const projectAssignment = await ProjectAssignmentManager.findProjectAssignmentById(req.params.id);
            if (projectAssignment) {
                res.status(ErrorCodes.SUCCESS).json(projectAssignment);
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectAssignmentError.MESSAGES.PROJECT_ASSIGNMENT_NOT_FOUND
                });
            }
        } catch (error) {
            res.status(ErrorCodes.BAD_REQUEST).send({
                message: error.message || ProjectAssignmentError.MESSAGES.SOMETHING_WENT_WRONG
            });
        }
    }

    static async createProjectAssignment(req, res) {
        try {
            const newProjectAssignment = await ProjectAssignmentManager.createProjectAssignment(req.body);
            res.status(ErrorCodes.SUCCESS).json(newProjectAssignment);
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ProjectAssignmentError.MESSAGES.PROJECT_ASSIGNMENT_CREATION_FAILED
            });
        }
    }

    static async updateProjectAssignment(req, res) {
        try {
            const updated = await ProjectAssignmentManager.updateProjectAssignment(req.params.id, req.body);
            if (updated) {
                res.status(ErrorCodes.SUCCESS).send({ message: "Project assignment was updated successfully." });
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectAssignmentError.MESSAGES.PROJECT_ASSIGNMENT_NOT_FOUND
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ProjectAssignmentError.MESSAGES.PROJECT_ASSIGNMENT_UPDATE_FAILED
            });
        }
    }

    static async deleteProjectAssignment(req, res) {
        try {
            const deleted = await ProjectAssignmentManager.deleteProjectAssignment(req.params.id);
            if (deleted) {
                res.status(ErrorCodes.SUCCESS).send({ message: "Project assignment was deleted successfully!" });
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: ProjectAssignmentError.MESSAGES.PROJECT_ASSIGNMENT_NOT_FOUND
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ProjectAssignmentError.MESSAGES.PROJECT_ASSIGNMENT_DELETION_FAILED
            });
        }
    }

    static async deleteAllProjectAssignments(req, res) {
        try {
            const deleted = await ProjectAssignmentManager.deleteAllProjectAssignments();
            res.status(ErrorCodes.SUCCESS).send({
                message: `${deleted} Project assignments were deleted successfully!`
            });
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ProjectAssignmentError.MESSAGES.PROJECTS_DELETION_FAILED
            });
        }
    }
}

module.exports = ProjectAssignmentController;
