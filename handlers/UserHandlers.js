const { User } = require("../models/index");
const bcrypt = require("bcrypt");

class UserHandler {

  static async findAllUsers(role) {

    return User.findAll({
      where: {
        user_type: role
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

  static async findUserByEmail(email) {

    return User.findOne({ where: { email } });
  }

  static async verifyPassword(user, password) {

    return bcrypt.compare(password, user.password);
  }

  static async findUserById(id) {

    return User.findOne({
      where: {
        user_id: id
      }
    });
  }
}

module.exports = UserHandler;
