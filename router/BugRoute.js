const express = require('express');
const router = express.Router();
const bugController = require('../App/Bug/BugController');
const AuthMiddleware = require('../middleware/Auth');
const BugController = require('../App/Bug/BugController');
router.get('/', bugController.getAllBugs);
router.get('/id/:id', bugController.getBugById);
router.get('/project/:id', bugController.getProjectbugsById);
router.get('/name/:name', BugController.getBugsbyname); // Changed to /name/:name
router.post('/',AuthMiddleware.authorizeQA ,bugController.createBug);
router.patch('/:id',AuthMiddleware.authorizeQA, bugController.updateBug);
router.delete('/:id',AuthMiddleware.authorizeQA ,bugController.deleteBug);
router.delete('/', AuthMiddleware.authorizeQA,bugController.deleteAllBugs);
router.patch('/UpdateStatus/:id', AuthMiddleware.authorizeQA,bugController.UpdateStatusofBug)
module.exports = router;
