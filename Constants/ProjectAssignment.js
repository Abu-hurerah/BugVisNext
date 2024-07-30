const ProjectAssignmentError = Object.freeze({
    MESSAGES: {
      PROJECT_ASSIGNMENT_NOT_FOUND: 'Cannot find project assignment with the given ID.',
      INVALID_PROJECT_ASSIGNMENT_ID: 'Invalid project assignment ID provided.',
      PROJECT_ASSIGNMENT_CREATION_FAILED: 'Something went wrong while creating the project assignment. Please try again.',
      PROJECT_ASSIGNMENT_UPDATE_FAILED: 'Something went wrong while updating the project assignment. Please try again.',
      PROJECT_ASSIGNMENT_DELETION_FAILED: 'Something went wrong while deleting the project assignment. Please try again.',
      INVALID_PROJECT_ID: 'Invalid or missing project ID.',
      INVALID_USER_ID: 'Invalid or missing user ID.',
      MISSING_PROJECT_ASSIGNMENT_DATA: 'Content can not be empty!',
      NO_PROJECT_ASSIGNMENTS_FOUND: 'No project assignments found.',
      PROJECT_ASSIGNMENT_ALREADY_EXISTS: 'Project assignment already exists.',
      SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.'
    }
  });
  
  module.exports = ProjectAssignmentError;
  