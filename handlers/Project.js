// ProjectHandler.js
const { Project } = require("../models");
const { Bug } = require("../models")
const Sequelize = require("sequelize");
const { Op } = require('sequelize');
const {ProjectAssignment} = require("../models")
class ProjectHandler {
  static async findAllProjects(user_id, sortOrder = 'ASC', limit = 10, offset = 0, searchterm = '') {
    const projects = await Project.findAndCountAll({
      include: [{
        model: ProjectAssignment,
        where: {
          user_id: user_id
        },
      }],
      where: searchterm ? {
        name: { [Op.like]: `%${searchterm}%` }
      } : {},
      order: [['name', sortOrder]],
      limit: limit,
      offset: offset,
      distinct: true // This ensures count is accurate by considering distinct project IDs
    });

    return projects;
  }




  static async findProjectById(id) {
    return Project.findByPk(id);
  }
  static async gettaskbyproject(id) {
    try {
      // Count total bugs for the project
      const totalBugs = await Bug.count({
        where: { project_id: id }
      });

      // Count bugs that are either completed or resolved
      const completedOrResolvedBugs = await Bug.count({
        where: {
          project_id: id,
          status: {
            [Op.or]: ['completed', 'resolved']
          }
        }
      });

      return {
        totalBugs,
        completedOrResolvedBugs
      };
    } catch (error) {
      console.error('Error fetching task data:', error);
      throw error;
    }
  }
  static async findProjectsByName(
    nameSubstring,
    ManagerID,
    sortOrder,
    limit,
    offset
  ) {
    return await Project.findAndCountAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${nameSubstring}%`,
        },
        manager_id: ManagerID, // Ensure only projects managed by the user are returned
      },
      order: [["name", sortOrder]],
      limit: limit,
      offset: offset,
    });
  }

  static async ValidateExistingProject(name) {
    try {
      const existingProject = await Project.findOne({
        where: {
          name: name,
        },
      });
      if (existingProject) {
        throw new Error("Project already exists");
      }
      return true; // Return true if project does not exist
    } catch (error) {
      console.error('Error validating existing project:', error);
      throw error;
    }
  }

  static async createProject(data) {
    try {
      console.log("Creating project with data:", data);
      const project = await Project.create(data);
      console.log("Created Projected ID: ", project.dataValues.project_id)
      const Assigmentdata = {
        project_id : project.dataValues.project_id,
        user_id: data.manager_id
      }
      ProjectAssignment.create(Assigmentdata)

      console.log("Project created successfully:", project);
      return project;  // Return the created project
    } catch (error) {
      console.error("Error in createProject:", error);
      throw new Error(`Failed to create project. ${error.message}`);
    }
  }


  static async updateProject(data) {      
      console.log("Handler")
      const project = await ProjectAssignment.create(data);
      console.log("Project Assignment created successfully:", project);
      return project
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
