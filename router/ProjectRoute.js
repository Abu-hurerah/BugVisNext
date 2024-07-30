const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController');
const { authenticateToken } = require('../Auth/Auth');
const { authorizeManager } = require('../Auth/Authorize');

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', authenticateToken, authorizeManager, projectController.createProject);
router.patch('/:id', authenticateToken, authorizeManager, projectController.updateProject);
router.delete('/:id', authenticateToken, authorizeManager, projectController.deleteProject);
router.delete('/', authenticateToken, authorizeManager, projectController.deleteAllProjects);

module.exports = router;
