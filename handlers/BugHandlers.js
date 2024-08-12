const { Bug } = require("../models");
const { Op } = require('sequelize');

class BugHandler {

  static async findAllBugsWithProjectId(id, sortOrder = 'ASC', limit = 10, offset = 0, searchterm = '') {
      const whereClause = {
        project_id: id
      };
      if (searchterm) {
        whereClause.title = { [Op.like]: `%${searchterm}%` };
      }
      const bugs = await Bug.findAndCountAll({
        where: whereClause,
        order: [['title', sortOrder]], 
        limit: limit,
        offset: offset
      });

      return bugs;
  }

  static async createBug(data) {
    
    return await Bug.create(data);
  }

  static async updateBug(id, data) {
    
    return await Bug.update(data, { where: { bug_id: id } });
  }
}

module.exports = BugHandler;
