// ProjectUtility.js
const ProjectHandler = require('../handlers/Project');
const Validator = require('../helpers/Validators');

class ProjectUtility {
    static validateProjectData(data) {
        Validator.validateRequiredFields(data, ['name', 'manager_id']);
    }

    static validateProjectId(id) {
        Validator.validateId(id);
    }
    static ValidateExistingProject(name){
         return ProjectHandler.ValidateExistingProject(name)
    }
}

module.exports = ProjectUtility;
