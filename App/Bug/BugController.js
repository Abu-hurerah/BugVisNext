// BugController.js
const BugManager = require("./BugManager");
const { ErrorCodes, BugError, ErrorMessages } = require("../../Constants");

class BugController {
  static async getAllBugs(req, res) {
    try {
        const page = parseInt(req.query.page) || 1; // Default to first page if not specified
        const limit = 10; // Number of items per page
        const Bugs = await BugManager.findAllBugs(req, page, limit);
  
        if (Bugs.rows.length > 0) {
          res.status(ErrorCodes.SUCCESS).json({
            data: Bugs.rows,
            totalItems: Bugs.count,
            totalPages: Math.ceil(Bugs.count / limit),
            currentPage: page,
          });
        } else {
          res.status(ErrorCodes.SUCCESS).json({
            message: "No Bugs Found",
            data: [],
            totalItems: 0,
            totalPages: 0,
            currentPage: page,
        });
        }
      } catch (error) {
        res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
          message: error.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR,
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
          message: BugError.MESSAGES.BUG_NOT_FOUND,
        });
      }
    } catch (error) {
      res.status(ErrorCodes.BAD_REQUEST).send({
        message: error.message || BugError.MESSAGES.BUG_NOT_FOUND,
      });
    }
  }
  static async getBugsbyname(req, res) {
    try {
        const page = parseInt(req.query.page) || 1; // Default to first page if not specified
        const limit = 10; // Number of items per page
        const Bugs = await BugManager.findBugsByName(
            req,
            page,
            limit
        );

        if (Bugs.rows.length > 0) {
            res.status(ErrorCodes.SUCCESS).json(Bugs);
        } else {
            res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
                message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
            });
        }
    } catch (error) {
        res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
            message: error.message || ErrorMessages.MESSAGES.SOMETHING_WENT_WRONG,
        });
    }
}
  static async getProjectbugsById(req,res){
    try {
      const page = parseInt(req.query.page) || 1; // Default to first page if not specified
      const limit = 10; // Number of items per page
      const Bugs = await BugManager.findAllBugsWithProjectId(req, page, limit);

      if (Bugs.rows.length > 0) {
        res.status(ErrorCodes.SUCCESS).json({
          data: Bugs.rows,
          totalItems: Bugs.count,
          totalPages: Math.ceil(Bugs.count / limit),
          currentPage: page,
        });
      } else {
        res.status(ErrorCodes.SUCCESS).json({
          message: "No Project Found",
          data: [],
          totalItems: 0,
          totalPages: 0,
          currentPage: page,
      });
      }
    } catch (error) {
      res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
        message: error.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async createBug(req, res) {
    try {
      const newBug = await BugManager.createBug(req.body);
      res.status(ErrorCodes.SUCCESS).json(newBug);
    } catch (error) {
      res.status(ErrorCodes.BAD_REQUEST).send({
        message: error.message || BugError.MESSAGES.MISSING_REQUIRED_FIELDS,
      });
    }
  }

  static async updateBug(req, res) {
    try {
      const updated = await BugManager.updateBug(req.params.id, req.body);
      if (updated) {
        res
          .status(ErrorCodes.SUCCESS)
          .send({ message: "Bug was updated successfully." });
      } else {
        res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
          message: BugError.MESSAGES.BUG_NOT_FOUND,
        });
      }
    } catch (error) {
      res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
        message: error.message || BugError.MESSAGES.BUG_UPDATE_FAILED,
      });
    }
  }

  static async deleteBug(req, res) {
    try {
      const deleted = await BugManager.deleteBug(req.params.id);
      if (deleted) {
        res
          .status(ErrorCodes.SUCCESS)
          .send({ message: "Bug was deleted successfully!" });
      } else {
        res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
          message: BugError.MESSAGES.BUG_NOT_FOUND,
        });
      }
    } catch (error) {
      res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
        message: error.message || BugError.MESSAGES.BUG_DELETION_FAILED,
      });
    }
  }

  static async deleteAllBugs(req, res) {
    try {
      const deleted = await BugManager.deleteAllBugs();
      res
        .status(ErrorCodes.SUCCESS)
        .send({ message: `${deleted} Bugs were deleted successfully!` });
    } catch (error) {
      res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
        message: error.message || BugError.MESSAGES.SOMETHING_WENT_WRONG,
      });
    }
  }
  static async UpdateStatusofBug(req, res) {
    try {
      const updated = await BugManager.UpdateStatusofBug(
        req.params.id,
        req.body
      );
      res
        .status(ErrorCodes.SUCCESS)
        .send({ message: `${updated} Updated state successfully!` });
    } catch (error) {
      res.status(ErrorCodes.INTERNAL_SERVER_ERROR).send({
        message: error.message || BugError.MESSAGES.SOMETHING_WENT_WRONG,
      });
    }
  }
}

module.exports = BugController;
