const { User } = require('../models'); // Ensure path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Optional: for generating JWT tokens

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving users." });
    }
};

// GET a single user by id
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({ message: `Cannot find user with id=${id}.` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error retrieving user with id=" + id });
    }
};

// POST a new user (Signup)
const createUser = async (req, res) => {
    try {
        const { name, email, password, user_type } = req.body;
        if (!email || !name || !password || !user_type) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).send({ message: "Email is already in use!" });
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const newUser = await User.create({ name, email, password: hashedPassword, user_type });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Some error occurred while creating the user." });
    }
};

// POST to login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).send({ message: "User not found!" });
            return;
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).send({ message: "Invalid credentials!" });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.user_id, user_type: user.user_type }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ user,token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Some error occurred while logging in." });
    }
};

// DELETE a user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await User.destroy({
            where: { user_id: id }
        });
        if (deleted) {
            res.status(200).send({ message: "User was deleted successfully!" });
        } else {
            res.status(404).send({ message: `Cannot delete user with id=${id}. Maybe user was not found!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Could not delete user with id=" + id });
    }
};

// PATCH a user
const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updated = await User.update(req.body, {
            where: { user_id: id }
        });
        if (updated == 1) {
            res.status(200).send({ message: "User was updated successfully." });
        } else {
            res.status(404).send({
                message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating user with id=" + id });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
    deleteUser,
    updateUser
};
