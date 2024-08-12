const express = require('express');
const UserController = require('../app/User/UserController');
const router = express.Router();

router.get('/:role', UserController.getAllUsers);
router.post('/signup', UserController.createUser);
router.post('/login', UserController.loginUser);

module.exports = router;
