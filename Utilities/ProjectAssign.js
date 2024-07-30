// ProjectAssignmentUtility.js
const Validator = require('../helpers/Validators');

class ProjectAssignmentUtility {
    static validateProjectAssignmentData(data) {
        // You might specify required fields specific to project assignments
        Validator.validateRequiredFields(data, ['project_id', 'user_id']); // Example fields
    }

    static validateProjectAssignmentId(id) {
        Validator.validateId(id);
    }
}

module.exports = ProjectAssignmentUtility;