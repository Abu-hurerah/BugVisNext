const express = require('express');
const router = express.Router();
const userController = require('../App/User/UserController')
// Retrieve all users
router.get('/', userController.getAllUsers);

// Retrieve users by name - Assuming 'name' is a unique identifier or partial name filter
router.get('/:name', userController.getUsersByName);

// User sign-up
router.post('/signup', userController.createUser);

// User login
router.post('/login', userController.loginUser);

// Update user details
router.patch('/:id', userController.updateUser);

// Delete user - assuming deletion is by token and not by id in the URL
router.delete('/', userController.deleteUser);

module.exports = router;
