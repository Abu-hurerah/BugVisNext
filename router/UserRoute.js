const express = require('express');
const userController = require('../App/User/UserController');
const router = express.Router();

// Retrieve all users
router.get('/', userController.getAllUsers);

// Retrieve a user by name
router.get('/name/:name', userController.getUsersByName);

// User sign-up
router.post('/signup', userController.createUser);

// User login
router.post('/login', userController.loginUser);

// Update user details
router.patch('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
