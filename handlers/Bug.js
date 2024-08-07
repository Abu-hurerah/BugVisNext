// BugHandler.js
const { Bug, Project } = require("../models");
const Sequelize = require("sequelize");
const { Op } = require('sequelize');
class BugHandler {
    static async findAllBugs(User_id, sortOrder = 'ASC', limit = 10, offset = 0, searchterm = '') {
        const whereClause = {
            [Op.or]: [
                { reported_by: User_id },
                { assigned_to: User_id }
            ]
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
    
    static async findAllBugsWithProjectId(id, sortOrder = 'ASC', limit = 10, offset = 0, searchterm = '') {
        try {
            const whereClause = {
                project_id: id
            };
    
            if (searchterm) {
                whereClause.title = { [Op.like]: `%${searchterm}%` };
            }
    
            const bugs = await Bug.findAndCountAll({
                where: whereClause,
                order: [['title', sortOrder]], // Ensure `sortOrder` is either 'ASC' or 'DESC'
                limit: limit,
                offset: offset
            });
    
            return bugs;
        } catch (error) {
            console.error("Error fetching bugs:", error);
            throw error; // Rethrow the error after logging it
        }
    }
    
    // Other methods remain unchanged...
    static async findBugsByName(
        nameSubstring,
        User_id,
        sortOrder,
        limit,
        offset) {
        return await Bug.findAndCountAll({
            where: {
                title: {
                    [Sequelize.Op.like]: `%${nameSubstring}%`,
                },
                [Op.or]: [
                    { reported_by: User_id },
                    { assigned_to: User_id }
                ]
            },
            order: [["title", sortOrder]],
            limit: limit,
            offset: offset,
        });
    }

    static async findBugById(id) {
        return Bug.findByPk(id);
    }

    static async createBug(data) {
        return Bug.create(data);
    }

    static async updateBug(id, data) {
        return Bug.update(data, { where: { bug_id: id } });
    }

    static async deleteBug(id) {
        return Bug.destroy({ where: { bug_id: id } });
    }

    static async deleteAllBugs() {
        return Bug.destroy({ where: {}, truncate: true });
    }
    static async updateStatus(id, body) {
        return Bug.update(body, { where: { bug_id: id } });
    }
}

module.exports = BugHandler;
