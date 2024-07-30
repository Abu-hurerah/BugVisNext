const ProjectError = Object.freeze({
    MESSAGES: {
      INVALID_PROJECT_ID: 'Invalid project ID provided',
      PROJECT_NOT_FOUND: 'Project not found',
      PROJECT_ALREADY_EXISTS: 'Project already exists',
      PROJECT_CREATION_FAILED: 'Something went wrong while creating the project. Please try again.',
      PROJECT_UPDATE_FAILED: 'Something went wrong while updating the project. Please try again.',
      PROJECT_DELETION_FAILED: 'Something went wrong while deleting the project. Please try again.',
      INVALID_DATA_TO_CREATE_PROJECT: 'Invalid data to create project',
      INVALID_DATA_TO_UPDATE_PROJECT: 'Invalid data to update project',
      INVALID_MANAGER_ID: 'Invalid manager ID provided',
      MISSING_PROJECT_NAME: 'Project name cannot be empty',
      MISSING_MANAGER_ID: 'Manager ID cannot be empty',
      UNAUTHORIZED_PROJECT_ACCESS: 'You do not have permission to access this project',
      PROJECT_DATA_FETCH_FAILED: 'Something went wrong while fetching the project data. Please try again.',
      PROJECTS_DELETION_FAILED: 'Something went wrong while deleting projects. Please try again.',
      CANNOT_DELETE_PROJECT: 'Cannot delete project. Maybe project was not found or it is protected.',
      SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.'
    }
  });
  
  module.exports = ProjectError;
  