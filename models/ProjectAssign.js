const sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    const ProjectAssignment = sequelize.define('ProjectAssignment', {
      project_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Projects',
          key: 'project_id'
        },
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        primaryKey: true
      }
    }, {
      tableName: 'ProjectAssignments',
      timestamps: false
    });
  
    return ProjectAssignment;
  };
  