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
router.post('/Asisgn/QA/:id', AuthMiddleware.authorizeManager, AuthMiddleware.authorizeAssignedProject,projectController.AssignQAToProject)
router.post('/Asisgn/dev/:id', AuthMiddleware.authorizeManager, AuthMiddleware.authorizeAssignedProject,projectController.AssigndevToProject)
router.get('/task/:id',projectController.gettaskbyproject)



module.exports = router;
