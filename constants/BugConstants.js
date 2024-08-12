const BugError = Object.freeze({

    MESSAGES: {
      BUG_NOT_FOUND: 'Cannot find bug with the provided ID.',
      INVALID_BUG_ID: 'Invalid bug ID provided.',
      BUG_CREATION_FAILED: 'Something went wrong while creating the bug. Please try again.',
      BUG_UPDATE_FAILED: 'Something went wrong while updating the bug. Please try again.',
      BUG_DELETION_FAILED: 'Something went wrong while deleting the bug. Please try again.',
      INVALID_BUG_DATA: 'Provided data for the bug is invalid or incomplete.',
      MISSING_REQUIRED_FIELDS: 'Required fields are missing. Ensure all mandatory fields are provided.',
      NO_BUGS_FOUND: 'No bugs found.',
      BUG_ALREADY_EXISTS: 'Bug with the provided details already exists.',
      SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
      BUG_CREATED_SUCCESSFUL: 'BUG CREATED SUCCESSFULLY.',
      BUG_UPDATED_SUCCESS: 'BUG ASSIGNED SUCCESSFULLY.'
    }
    
  });
  
  module.exports = BugError;
  