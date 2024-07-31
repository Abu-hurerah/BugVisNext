const express = require('express');
const router = express.Router();
const bugController = require('../App/Bug/BugController');
const AuthMiddleware = require('../middleware/Auth');
router.get('/', bugController.getAllBugs);
router.get('/:id', bugController.getBugById);
router.post('/',AuthMiddleware.authorizeQA ,bugController.createBug);
router.patch('/:id',AuthMiddleware.authorizeQA, bugController.updateBug);
router.delete('/:id',AuthMiddleware.authorizeQA ,bugController.deleteBug);
router.delete('/', AuthMiddleware.authorizeQA,bugController.deleteAllBugs);
router.patch('/UpdateStatus/:id', AuthMiddleware.authorizeQA,bugController.UpdateStatusofBug)
module.exports = router;
