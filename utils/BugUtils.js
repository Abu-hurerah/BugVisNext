const { ErrorCodes, BugError } = require('../constants');
const Exception = require('../helpers/Exception');
const Validator = require('../helpers/Validators');

class BugUtility {

  static validateBugData(data) {
    Validator.validateRequiredFields(data, ['title', 'type', 'status', 'project_id', 'reported_by']);
    const rules = [
      { field: 'title', type: 'string', nonEmpty: true },
      { field: 'project_id', type: 'integer', positive: true },
      { field: 'description', type: 'string' },
      { field: 'deadline', type: 'date' },
      { field: 'screenshot', type: 'string' },
      { field: 'type', enum: ['feature', 'bug'] },
      { field: 'status', enum: ['new', 'started', 'completed', 'resolved'] },
      { field: 'reported_by', type: 'integer', positive: true },
      { field: 'assigned_to', type: 'integer', positive: true, optional: true }
    ];
    rules.forEach(rule => {
      const value = data[rule.field];
      if (rule.type === 'string') {
        if (rule.nonEmpty && (typeof value !== 'string' || value.trim() === '')) {
          throw new Exception(ErrorCodes.NOT_IMPLEMENTED, BugError.MESSAGES.INVALID_BUG_DATA);
        }
        if (typeof value !== 'string') {
          throw new Exception(ErrorCodes.NOT_IMPLEMENTED, BugError.MESSAGES.INVALID_BUG_DATA);
        }
      } else if (rule.type === 'integer') {
        if (value && (!Number.isInteger(value) || (rule.positive && value <= 0))) {
          throw new Exception(ErrorCodes.NOT_IMPLEMENTED, BugError.MESSAGES.INVALID_BUG_DATA);
        }
      } else if (rule.type === 'date') {
        if (value && isNaN(Date.parse(value))) {
          throw new Exception(ErrorCodes.NOT_IMPLEMENTED, BugError.MESSAGES.INVALID_BUG_DATA);
        }
      } else if (rule.enum) {
        if (!rule.enum.includes(value)) {
          throw new Exception(ErrorCodes.NOT_IMPLEMENTED, BugError.MESSAGES.INVALID_BUG_DATA);
        }
      }
    });
  }

  static validateBugId(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Exception(ErrorCodes.NOT_IMPLEMENTED, BugError.MESSAGES.INVALID_BUG_ID);
    }
  }
}

module.exports = BugUtility;
