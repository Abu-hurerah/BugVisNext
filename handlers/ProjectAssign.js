// ProjectAssignmentHandler.js
const { ProjectAssignment } = require('../models');

class ProjectAssignmentHandler {
    static async findAllProjectAssignments() {
        return ProjectAssignment.findAll();
    }

    static async findProjectAssignmentById(id) {
        return ProjectAssignment.findByPk(id);
    }

    static async createProjectAssignment(data) {
        return ProjectAssignment.create(data);
    }

    static async updateProjectAssignment(id, data) {
        return ProjectAssignment.update(data, { where: { id: id } });
    }

    static async deleteProjectAssignment(id) {
        return ProjectAssignment.destroy({ where: { id: id } });
    }

    static async deleteAllProjectAssignments() {
        return ProjectAssignment.destroy({ where: {}, truncate: true });
    }
}

module.exports = ProjectAssignmentHandler;
