// ProjectManager.js
const ProjectHandler = require('../../handlers/Project');
const ProjectUtility = require('../../Utilities/Project');
const Token = require('../../helpers/Token')
class ProjectManager {
    static async findAllProjects() {
        return await ProjectHandler.findAllProjects();
    }

    static async findProjectById(id) {
        ProjectUtility.validateProjectId(id);
        const project = await ProjectHandler.findProjectById(id);
        if (!project) {
            throw new Error("Project not found");
        }
        return project;
    }
    static async findProjectsByName(name){
            return await ProjectHandler.findprojectByName(name);
    }

    static async createProject(req) {
        try {
            // Extract the authorization header
            const authHeader = req.headers.authorization;
            
            // Extract the user ID from the token
            const manager_id = await Token.getIdFromToken(authHeader);
            // Set the user_id into req.body.project_id
            req.body.manager_id = manager_id;
            console.log(req.body)
            // Validate the project data
            ProjectUtility.validateProjectData(req.body);
    
            // Call the handler to create the project
            return await ProjectHandler.createProject(req.body);
        } catch (error) {
            throw new Error(`createProject:: Failed to create project. ${error.message}`);
        }
    }
    static async updateProject(id, data) {
        ProjectUtility.validateProjectId(id);
        ProjectUtility.validateProjectData(data);
        return await ProjectHandler.updateProject(id, data);
    }

    static async deleteProject(id) {
        ProjectUtility.validateProjectId(id);
        return await ProjectHandler.deleteProject(id);
    }

    static async deleteAllProjects() {
        return await ProjectHandler.deleteAllProjects();
    }
    static async AssignQAToProject(req){
        return await ProjectHandler.AssignQAToProject(req);
    }
    static async AssigndevToProject(req){
        return await ProjectHandler.AssigndevToProject(req);
    }
    
}

module.exports = ProjectManager;
