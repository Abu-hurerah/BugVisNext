// BugHandler.js
const { Bug } = require('../models');

class BugHandler {
    static async findAllBugs() {
        return Bug.findAll();
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
    static async updateStatus(id,body){
        return Bug.update(body,{where:{bug_id:id}})
    }
}

module.exports = BugHandler;
