const express = require('express');
const router = express.Router();
const BugController = require('../app/Bug/BugController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.get('/project/:id', BugController.getProjectbugsById);
router.post('/', AuthMiddleware.authorizeQA, BugController.createBug);
router.patch('/:id', AuthMiddleware.authorizeQA, BugController.updateBug);

module.exports = router;
