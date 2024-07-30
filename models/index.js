const dbConfig = require('../config/dbconfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        dialectOptions: {
            connectTimeout: 10000 // This is in milliseconds
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
            evict: 10000 // Automatically remove idle connections after 10 seconds
        },
        retry: {
            max: 3 // Set max number of retries on new connection
        },
        logging: console.log, // Enable logging; can be set to false if not needed
    }
);

// Import model files
const User = require('./UserModel')(sequelize, DataTypes);
const Project = require('./ProjectModel')(sequelize, DataTypes);
const ProjectAssignment = require('./ProjectAssign')(sequelize, DataTypes);
const Bug = require('./BugModel')(sequelize, DataTypes);

// Define relationships in a separate function to ensure all models are loaded
const defineModelAssociations = () => {
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
};

// Call the function to define model associations
defineModelAssociations();

module.exports = {
    sequelize,
    User,
    Project,
    ProjectAssignment,
    Bug
};
