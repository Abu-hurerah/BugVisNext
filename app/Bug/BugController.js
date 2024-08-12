// BugController.js
const BugManager = require("./BugManager");
const { ErrorCodes, BugError, ErrorMessages } = require("../../constants");

class BugController {

  static async getAllBugs(req, res) {
    try {
      const page = parseInt(req?.query?.page) || 1;
      const limit = 10;
      const Bugs = await BugManager.findAllBugs(req, page, limit);
      if (Bugs?.rows?.length) {
        res.status(ErrorCodes.SUCCESS).json({
          data: Bugs.rows,
          totalItems: Bugs.count,
          totalPages: Math.ceil(Bugs.count / limit),
          currentPage: page,
        });
      } else {
        res.status(ErrorCodes.SUCCESS).json({
          message: BugError.MESSAGES.BUG_NOT_FOUND,
          data: [],
          totalItems: 0,
          totalPages: 0,
          currentPage: page,
        });
      }
    } catch (err) {
      res.status(err.code || 500).json({
        success: false,
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async getBugById(req, res) {
    try {
      const bug = await BugManager.findBugById(req?.params?.id);
      if (bug) {
        res.status(ErrorCodes.SUCCESS).json(bug);
      } else {
        res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
          message: BugError.MESSAGES.BUG_NOT_FOUND,
        });
      }
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async getBugsbyname(req, res) {
    try {
      const page = parseInt(req?.query?.page) || 1; // Default to first page if not specified
      const limit = 10; // Number of items per page
      const Bugs = await BugManager.findBugsByName(
        req,
        page,
        limit
      );
      if (Bugs?.rows?.length) {
        res.status(ErrorCodes.SUCCESS).json(Bugs);
      } else {
        res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
          message: ProjectError.MESSAGES.PROJECT_NOT_FOUND,
        });
      }
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async getProjectbugsById(req, res) {
    try {
      const page = parseInt(req?.query?.page) || 1;
      const limit = 10;
      const Bugs = await BugManager.findAllBugsWithProjectId(req, page, limit);

      if (Bugs?.rows?.length) {
        res.status(ErrorCodes.SUCCESS).json({
          data: Bugs.rows,
          totalItems: Bugs.count,
          totalPages: Math.ceil(Bugs.count / limit),
          currentPage: page,
        });
      } else {
        res.status(ErrorCodes.SUCCESS).json({
          message: BugError.MESSAGES.BUG_NOT_FOUND,
          data: [],
          totalItems: 0,
          totalPages: 0,
          currentPage: page,
        });
      }
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async createBug(req, res) {
    try {
      await BugManager.createBug(req);
      res.status(ErrorCodes.SUCCESS)
        .send({ message: BugError.MESSAGES.BUG_CREATED_SUCCESSFUL });
      ;
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }

  static async updateBug(req, res) {
    try {
      const updated = await BugManager.updateBug(req?.params?.id, req.body);
      if (updated) {
        res
          .status(ErrorCodes.SUCCESS)
          .send({ message: BugError.MESSAGES.BUG_UPDATED_SUCCESS });
      } else {
        res.status(ErrorCodes.DOCUMENT_NOT_FOUND).send({
          message: BugError.MESSAGES.BUG_NOT_FOUND,
        });
      }
    } catch (err) {
      res.status(err.code || 500).json({
        message: err.message || ErrorMessages.MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }
}

module.exports = BugController;
