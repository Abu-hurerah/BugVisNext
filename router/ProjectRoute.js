const express = require('express');
const router = express.Router();
const ProjectController = require('../app/Project/ProjectController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.get('/', ProjectController.getAllProjects);
router.post('/', AuthMiddleware.authorizeManager, ProjectController.createProject);
router.patch('/', AuthMiddleware.authorizeManager, ProjectController.updateProject);
router.get('/task/:id', ProjectController.gettaskbyproject)

module.exports = router;