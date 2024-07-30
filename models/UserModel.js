module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_type: {
        type: DataTypes.ENUM('developer', 'manager', 'QA'),
        allowNull: true
      }
    }, {
      tableName: 'Users',
      timestamps: false
    });
  
    return User;
  };
  