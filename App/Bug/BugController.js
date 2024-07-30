// BugController.js
const BugManager = require('./BugManager');
const {
    ErrorCodes,
    BugError,
    ErrorMessages,
} = require('../../Constants');

class BugController {
    static async getAllBugs(req, res) {
        try {
            const bugs = await BugManager.findAllBugs();
            if (bugs.length > 0) {
                res.status(ErrorCodes.SUCCESS).json(bugs);
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: BugError.MESSAGES.NO_BUGS_FOUND
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || ErrorMessages.INTERNAL_SERVER_ERROR
            });
        }
    }

    static async getBugById(req, res) {
        try {
            const bug = await BugManager.findBugById(req.params.id);
            if (bug) {
                res.status(ErrorCodes.SUCCESS).json(bug);
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: BugError.MESSAGES.BUG_NOT_FOUND
                });
            }
        } catch (error) {
            res.status(ErrorCodes.BAD_REQUEST).send({
                message: error.message || BugError.MESSAGES.BUG_NOT_FOUND
            });
        }
    }

    static async createBug(req, res) {
        try {
            const newBug = await BugManager.createBug(req.body);
            res.status(ErrorCodes.SUCCESS).json(newBug);
        } catch (error) {
            res.status(ErrorCodes.BAD_REQUEST).send({
                message: error.message || BugError.MESSAGES.MISSING_REQUIRED_FIELDS
            });
        }
    }

    static async updateBug(req, res) {
        try {
            const updated = await BugManager.updateBug(req.params.id, req.body);
            if (updated) {
                res.status(ErrorCodes.SUCCESS).send({ message: "Bug was updated successfully." });
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: BugError.MESSAGES.BUG_NOT_FOUND
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || BugError.MESSAGES.BUG_UPDATE_FAILED
            });
        }
    }

    static async deleteBug(req, res) {
        try {
            const deleted = await BugManager.deleteBug(req.params.id);
            if (deleted) {
                res.status(ErrorCodes.SUCCESS).send({ message: "Bug was deleted successfully!" });
            } else {
                res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                    message: BugError.MESSAGES.BUG_NOT_FOUND
                });
            }
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || BugError.MESSAGES.BUG_DELETION_FAILED
            });
        }
    }

    static async deleteAllBugs(req, res) {
        try {
            const deleted = await BugManager.deleteAllBugs();
            res.status(ErrorCodes.SUCCESS).send({ message: `${deleted} Bugs were deleted successfully!` });
        } catch (error) {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message || BugError.MESSAGES.SOMETHING_WENT_WRONG
            });
        }
    }
}

module.exports = BugController;
