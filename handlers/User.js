// UserHandler.js
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const {Sequelize} = require('sequelize')
class UserHandler {
    static async findAllUsers(role) {
        return User.findAll({
            where: {
                user_type: role
            }
        });
    }
    

    static async findUsersByName(nameSubstring) {
        return User.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: `%${nameSubstring}%`
                }
            }
        });
    }
    static async findUserById(id) {
        return User.findOne({
            where: {
                user_id: id
            }
        });
    }
    
    static async createUser(data) {
        const { name, email, password, user_type } = data;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return User.create({
            name,
            email,
            password: hashedPassword,
            user_type
        });
    }

    static async updateUser(id, data) {
        return User.update(data, { where: { user_id: id } });
    }

    static async deleteUser(id) {
        return User.destroy({ where: { user_id: id } });
    }

    static async findUserByEmail(email) {
        return User.findOne({ where: { email } });
    }

    static async verifyPassword(user, password) {
        return bcrypt.compare(password, user.password);
    }
}

module.exports = UserHandler;
