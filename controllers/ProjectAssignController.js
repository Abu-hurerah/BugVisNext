const { ProjectAssignment } = require('../models'); // Ensure the path to your models is correct

// GET all project assignments
const getAllProjectAssignments = async (req, res) => {
    try {
        const projectAssignments = await ProjectAssignment.findAll();
        res.status(200).json(projectAssignments);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving project assignments." });
    }
};

// GET a single project assignment by id
const getProjectAssignmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const projectAssignment = await ProjectAssignment.findByPk(id);
        if (projectAssignment) {
            res.status(200).json(projectAssignment);
        } else {
            res.status(404).send({ message: `Cannot find project assignment with id=${id}.` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error retrieving project assignment with id=" + id });
    }
};

// POST a new project assignment
const createProjectAssignment = async (req, res) => {
    try {
        const { project_id, user_id } = req.body;
        if (!project_id || !user_id) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        const newProjectAssignment = await ProjectAssignment.create({ project_id, user_id });
        res.status(201).json(newProjectAssignment);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while creating the project assignment." });
    }
};

// PATCH a project assignment
const updateProjectAssignment = async (req, res) => {
    const id = req.params.id;
    try {
        const updated = await ProjectAssignment.update(req.body, {
            where: { id: id } // Adjust the primary key if it's a composite key
        });
        if (updated == 1) {
            res.status(200).send({ message: "Project assignment was updated successfully." });
        } else {
            res.status(404).send({
                message: `Cannot update project assignment with id=${id}. Maybe project assignment was not found or req.body is empty!`
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating project assignment with id=" + id });
    }
};

// DELETE a project assignment
const deleteProjectAssignment = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await ProjectAssignment.destroy({
            where: { id: id } // Adjust the primary key if it's a composite key
        });
        if (deleted) {
            res.status(200).send({ message: "Project assignment was deleted successfully!" });
        } else {
            res.status(404).send({ message: `Cannot delete project assignment with id=${id}. Maybe project assignment was not found!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Could not delete project assignment with id=" + id });
    }
};

// DELETE all project assignments
const deleteAllProjectAssignments = async (req, res) => {
    try {
        const deleted = await ProjectAssignment.destroy({
            where: {},
            truncate: true
        });
        res.status(200).send({ message: `${deleted} Project assignments were deleted successfully!` });
    } catch (error) {
        res.status(500).send({ message: "Some error occurred while removing all project assignments." });
    }
};

module.exports = {
    getAllProjectAssignments,
    getProjectAssignmentById,
    createProjectAssignment,
    updateProjectAssignment,
    deleteProjectAssignment,
    deleteAllProjectAssignments
};
