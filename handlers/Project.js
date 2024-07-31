// ProjectHandler.js
const { Project } = require("../models");
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
          [Sequelize.Op.like]: `%${nameSubstring}%`,
        },
      },
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
  static async AssigndevToProject(req) {
    const { project_id, dev_id } = req.body;

    try {
      // Fetch the project by ID
      const project = await Project.findByPk(project_id);

      // Check if the project exists
      if (!project) {
        throw new Error("Project not found");
      }

      let currentDevIds = project.dev_id || [];
      if (!currentDevIds.includes(dev_id)) {
        currentQaIds.push(dev_id);

        // Update the project with the new list of QA IDs
        project.dev_id = currentDevIds;

        // Save the changes
        await project.save();
      } else {
        throw new Error("Dev ID already assigned to this project");
      }

      return project;
    } catch (error) {
      // Handle errors appropriately
      console.error("Error assigning QA to project:", error);
      throw error;
    }
  }
  static async AssignQAToProject(req) {
    const { project_id, qa_id } = req.body;

    try {
      // Fetch the project by ID
      const project = await Project.findByPk(project_id);

      // Check if the project exists
      if (!project) {
        throw new Error("Project not found");
      }

      // Get the current QA IDs and add the new QA ID
      let currentQaIds = project.qa_ids || [];
      if (!currentQaIds.includes(qa_id)) {
        currentQaIds.push(qa_id);

        // Update the project with the new list of QA IDs
        project.qa_ids = currentQaIds;

        // Save the changes
        await project.save();
      } else {
        throw new Error("QA ID already assigned to this project");
      }

      return project;
    } catch (error) {
      // Handle errors appropriately
      console.error("Error assigning QA to project:", error);
      throw error;
    }
  }
}

module.exports = ProjectHandler;
