// db/associations.js

const { User, Project, ProjectAssignment, Bug } = require('../models');

// Define relationships
User.hasMany(Project, { foreignKey: 'manager_id' });
Project.belongsTo(User, { foreignKey: 'manager_id' });

User.belongsToMany(Project, { through: ProjectAssignment, foreignKey: 'user_id', otherKey: 'project_id' });
Project.belongsToMany(User, { through: ProjectAssignment, foreignKey: 'project_id', otherKey: 'user_id' });

Project.hasMany(Bug, { foreignKey: 'project_id' });
Bug.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Bug, { as: 'ReportedBugs', foreignKey: 'reported_by' });
Bug.belongsTo(User, { as: 'Reporter', foreignKey: 'reported_by' });

User.hasMany(Bug, { as: 'AssignedBugs', foreignKey: 'assigned_to' });
Bug.belongsTo(User, { as: 'Assignee', foreignKey: 'assigned_to' });

module.exports = {
    User,
    Project,
    ProjectAssignment,
    Bug
};
