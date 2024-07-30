module.exports = (sequelize, DataTypes) => {
    const Bug = sequelize.define('Bug', {
      bug_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'project_id'
        }
      },
      description: {
        type: DataTypes.TEXT
      },
      deadline: {
        type: DataTypes.DATE
      },
      screenshot: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.ENUM('feature', 'bug'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('new', 'started', 'completed', 'resolved'),
        allowNull: false
      },
      reported_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      }
    }, {
      tableName: 'Bugs',
      timestamps: false
    });
  
    return Bug;
  };
  