const express = require('express');
const router = express.Router();
const projectController = require('../App/Project/ProjectController');
const AuthMiddleware = require('../middleware/Auth');
router.get('/', projectController.getAllProjects);
router.get('/id/:id', projectController.getProjectById); // Changed to /id/:id
router.get('/name/:name', projectController.getProjectsByName); // Changed to /name/:name
router.post('/', AuthMiddleware.authorizeManager,projectController.createProject);
router.patch('/:id', AuthMiddleware.authorizeManager,AuthMiddleware.authorizeManager ,projectController.updateProject);
router.delete('/:id', AuthMiddleware.authorizeManager, AuthMiddleware.authorizeManager,projectController.deleteProject);

module.exports = router;
