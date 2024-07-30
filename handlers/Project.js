// ProjectHandler.js
const { Project } = require('../models');
const Sequelize = require("sequelize");

class ProjectHandler {
    static async findAllProjects() {
        return Project.findAll();
    }

    static async findProjectById(id) {
        return Project.findByPk(id);
    }

    static async findProjectByName(nameSubstring) {
        return Project.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: `%${nameSubstring}%`
                }
            }
        });
    }

    static async createProject(data) {
        // Ensure qa_ids and dev_ids are arrays if provided
        if (data.qa_ids && !Array.isArray(data.qa_ids)) {
            data.qa_ids = [];
        }
        if (data.dev_ids && !Array.isArray(data.dev_ids)) {
            data.dev_ids = [];
        }
        return Project.create(data);
    }

    static async updateProject(id, data) {
        // Ensure qa_ids and dev_ids are arrays if provided
        if (data.qa_ids && !Array.isArray(data.qa_ids)) {
            data.qa_ids = [];
        }
        if (data.dev_ids && !Array.isArray(data.dev_ids)) {
            data.dev_ids = [];
        }
        return Project.update(data, { where: { project_id: id } });
    }

    static async deleteProject(id) {
        return Project.destroy({ where: { project_id: id } });
    }
}

module.exports = ProjectHandler;
