const express = require('express');
const router = express.Router();
const projectController = require('../App/Project/ProjectController');
const AuthMiddleware = require('../middleware/Auth');
router.get('/', projectController.getAllProjects);
router.post('/', AuthMiddleware.authorizeManager,projectController.createProject);
router.patch('/',AuthMiddleware.authorizeManager ,projectController.updateProject);
router.get('/task/:id',projectController.gettaskbyproject)


module.exports = router;
