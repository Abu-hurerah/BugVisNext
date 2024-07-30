const express = require('express');
const router = express.Router();
const bugController = require('../controllers/BugController');
const { authenticateToken } = require('../Auth/Auth');

router.get('/', bugController.getAllBugs);
router.get('/:id', bugController.getBugById);
router.post('/', bugController.createBug);
router.patch('/:id', bugController.updateBug);
router.delete('/:id', bugController.deleteBug);
router.delete('/', bugController.deleteAllBugs);

module.exports = router;
