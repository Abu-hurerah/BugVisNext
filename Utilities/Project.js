// ProjectUtility.js
const Validator = require('../helpers/Validators');

class ProjectUtility {
    static validateProjectData(data) {
        Validator.validateRequiredFields(data, ['name', 'manager_id']);
    }

    static validateProjectId(id) {
        Validator.validateId(id);
    }
}

module.exports = ProjectUtility;
