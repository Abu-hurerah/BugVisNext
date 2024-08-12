const { Project } = require("../models");
const { Bug } = require("../models")
const { Op } = require('sequelize');
const { ProjectAssignment } = require("../models");
const Exception = require("../helpers/Exception");
const { ErrorCodes, ProjectError } = require("../constants");

class ProjectHandler {

  static async findAllProjects(user_id, sortOrder = 'ASC', limit = 6, offset = 0, searchterm = '') {
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
      distinct: true
    });
    console.log(projects)

    return projects;
  }

  static async gettaskbyproject(id) {
    const totalBugs = await Bug.count({
      where: { project_id: id }
    });
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
  }

  static async createProject(data) {
    console.log("Dataaaaa: ",data)
    return await Project.create(data);
  }


  static async updateProject(data) {
    
    return await ProjectAssignment.create(data);
  }


  static async ValidateExistingProject(name) {
      const existingProject = await Project.findOne({
        where: {
          name: name,
        },
      });
      if (existingProject) {
        throw new Exception(ErrorCodes.CONFLICT_WITH_CURRENT_STATE,ProjectError.MESSAGES.PROJECT_ALREADY_EXISTS);
      }
      
      return true; 
  }
}

module.exports = ProjectHandler;
