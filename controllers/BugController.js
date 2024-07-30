const { Bug } = require('../models'); // Ensure the path to your models is correct

// GET all bugs
const getAllBugs = async (req, res) => {
    try {
        const bugs = await Bug.findAll();
        res.status(200).json(bugs);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving bugs." });
    }
};

// GET a single bug by id
const getBugById = async (req, res) => {
    try {
        const id = req.params.id;
        const bug = await Bug.findByPk(id);
        if (bug) {
            res.status(200).json(bug);
        } else {
            res.status(404).send({ message: `Cannot find bug with id=${id}.` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error retrieving bug with id=" + id });
    }
};

// POST a new bug
const createBug = async (req, res) => {
    try {
        const { title, description, deadline, screenshot, type, status, project_id, reported_by, assigned_to } = req.body;
        if (!title || !type || !status || !project_id || !reported_by) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        const newBug = await Bug.create({ title, description, deadline, screenshot, type, status, project_id, reported_by, assigned_to });
        res.status(201).json(newBug);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while creating the bug." });
    }
};

// PATCH a bug
const updateBug = async (req, res) => {
    const id = req.params.id;
    try {
        const updated = await Bug.update(req.body, {
            where: { bug_id: id }
        });
        if (updated == 1) {
            res.status(200).send({ message: "Bug was updated successfully." });
        } else {
            res.status(404).send({
                message: `Cannot update bug with id=${id}. Maybe bug was not found or req.body is empty!`
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating bug with id=" + id });
    }
};

// DELETE a bug
const deleteBug = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Bug.destroy({
            where: { bug_id: id }
        });
        if (deleted) {
            res.status(200).send({ message: "Bug was deleted successfully!" });
        } else {
            res.status(404).send({ message: `Cannot delete bug with id=${id}. Maybe bug was not found!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Could not delete bug with id=" + id });
    }
};

// DELETE all bugs
const deleteAllBugs = async (req, res) => {
    try {
        const deleted = await Bug.destroy({
            where: {},
            truncate: true
        });
        res.status(200).send({ message: `${deleted} Bugs were deleted successfully!` });
    } catch (error) {
        res.status(500).send({ message: "Some error occurred while removing all bugs." });
    }
};

module.exports = {
    getAllBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug,
    deleteAllBugs
};
