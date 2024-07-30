const express = require('express');
const router = express.Router();
const projectAssignmentController = require('../App/ProjectAssignment/ProjectAssignController');

router.get('/', projectAssignmentController.getAllProjectAssignments);
router.get('/:id', projectAssignmentController.getProjectAssignmentById);
router.post('/', projectAssignmentController.createProjectAssignment);
router.patch('/:id', projectAssignmentController.updateProjectAssignment);
router.delete('/:id', projectAssignmentController.deleteProjectAssignment);
router.delete('/', projectAssignmentController.deleteAllProjectAssignments);

module.exports = router;
