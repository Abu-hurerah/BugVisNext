// ProjectAssignmentManager.js
const ProjectAssignmentHandler = require('../../handlers/ProjectAssign');
const ProjectAssignmentUtility = require('../../Utilities/ProjectAssign');

class ProjectAssignmentManager {
    static async findAllProjectAssignments() {
        return await ProjectAssignmentHandler.findAllProjectAssignments();
    }

    static async findProjectAssignmentById(id) {
        ProjectAssignmentUtility.validateProjectAssignmentId(id);
        return await ProjectAssignmentHandler.findProjectAssignmentById(id);
    }

    static async createProjectAssignment(data) {
        ProjectAssignmentUtility.validateProjectAssignmentData(data);
        return await ProjectAssignmentHandler.createProjectAssignment(data);
    }

    static async updateProjectAssignment(id, data) {
        ProjectAssignmentUtility.validateProjectAssignmentId(id);
        ProjectAssignmentUtility.validateProjectAssignmentData(data);
        return await ProjectAssignmentHandler.updateProjectAssignment(id, data);
    }

    static async deleteProjectAssignment(id) {
        ProjectAssignmentUtility.validateProjectAssignmentId(id);
        return await ProjectAssignmentHandler.deleteProjectAssignment(id);
    }

    static async deleteAllProjectAssignments() {
        return await ProjectAssignmentHandler.deleteAllProjectAssignments();
    }
}

module.exports = ProjectAssignmentManager;
