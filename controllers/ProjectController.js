const { Project } = require('../models'); // Ensure the path to your models is correct

// GET all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving projects." });
    }
};

// GET a single project by id
const getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findByPk(id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).send({ message: `Cannot find project with id=${id}.` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error retrieving project with id=" + id });
    }
};

// POST a new project
const createProject = async (req, res) => {
    try {
        const { name, manager_id } = req.body;
        if (!name || !manager_id) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        const newProject = await Project.create({ name, manager_id });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while creating the project." });
    }
};

// PATCH a project
const updateProject = async (req, res) => {
    const id = req.params.id;
    try {
        const updated = await Project.update(req.body, {
            where: { project_id: id }
        });
        if (updated == 1) {
            res.status(200).send({ message: "Project was updated successfully." });
        } else {
            res.status(404).send({
                message: `Cannot update project with id=${id}. Maybe project was not found or req.body is empty!`
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating project with id=" + id });
    }
};

// DELETE a project
const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Project.destroy({
            where: { project_id: id }
        });
        if (deleted) {
            res.status(200).send({ message: "Project was deleted successfully!" });
        } else {
            res.status(404).send({ message: `Cannot delete project with id=${id}. Maybe project was not found!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Could not delete project with id=" + id });
    }
};

// DELETE all projects
const deleteAllProjects = async (req, res) => {
    try {
        const deleted = await Project.destroy({
            where: {},
            truncate: true
        });
        res.status(200).send({ message: `${deleted} Projects were deleted successfully!` });
    } catch (error) {
        res.status(500).send({ message: "Some error occurred while removing all projects." });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    deleteAllProjects
};
