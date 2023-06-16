const User = require("../models/user");
const CustomErrorHandler = require("../helper/CustomErrorHandler");
const { ADMIN_CODE } = require("../config");

class AuthService {
  async join(body) {
    const { username, avatar, invitationCode, isAdmin } = body;
    let role = "user";

    let userData = await User.findOne({ username });
    if (userData) {
      if (userData.status === "online")
        throw CustomErrorHandler.alreadyExist("Username already in use!");

      userData.status = "online";
      userData.avatar = avatar;
      userData = await userData.save();
      return userData;
    }

    if (isAdmin) {
      if (!invitationCode || invitationCode !== ADMIN_CODE)
        throw CustomErrorHandler.badRequest("Invalid invitation code!");

      role = "admin";
    }

    // create user
    const newUser = await User.create({
      username,
      avatar,
      status: "online",
      role,
    });

    return newUser;
  }

  async getAllUsers(userId) {
    const users = await User.find({
      _id: { $ne: userId },
      status: "online",
    }).sort({
      role: 1,
      createdAt: -1,
    });

    return users;
  }

  async getSingleUser(id) {
    const user = await User.findById(id);

    return user;
  }

  async validateUsername(username) {
    let result = {};
    let userData = await User.findOne({ username, status: "online" });

    if (userData) result.message = "Username already in use!";
    return result;
  }
}

module.exports = AuthService;
