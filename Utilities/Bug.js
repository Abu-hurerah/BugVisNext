// BugUtility.js
const Validator = require('../helpers/Validators');

class BugUtility {
    static validateBugData(data) {
        Validator.validateRequiredFields(data, ['title', 'type', 'status', 'project_id', 'reported_by']);
    }

    static validateBugId(id) {
        Validator.validateId(id);
    }
}

module.exports = BugUtility;
