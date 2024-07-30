// BugManager.js
const BugHandler = require('../../handlers/Bug');
const BugUtility = require('../../Utilities/Bug');

class BugManager {
    static async findAllBugs() {
        return await BugHandler.findAllBugs();
    }

    static async findBugById(id) {
        BugUtility.validateBugId(id);
        const bug = await BugHandler.findBugById(id);
        if (!bug) {
            throw new Error("Bug not found");
        }
        return bug;
    }

    static async createBug(data) {
        BugUtility.validateBugData(data);
        return await BugHandler.createBug(data);
    }

    static async updateBug(id, data) {
        BugUtility.validateBugId(id);
        return await BugHandler.updateBug(id, data);
    }

    static async deleteBug(id) {
        BugUtility.validateBugId(id);
        return await BugHandler.deleteBug(id);
    }

    static async deleteAllBugs() {
        return await BugHandler.deleteAllBugs();
    }
}

module.exports = BugManager;
