const AuthService = require("../services/auth");
const service = new AuthService();
let { Response, validateUsername } = require("../helper/helper");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

module.exports.join = {
  controller: async function join(req, res, next) {
    try {
      let { username, avatar } = req.body;
      req.body.username = username.toLowerCase().trim();

      if (!username)
        throw CustomErrorHandler.badRequest("Please enter a username!");

      if (!avatar) throw CustomErrorHandler.badRequest("Please select avatar!");

      if (!validateUsername(username)) {
        throw CustomErrorHandler.badRequest("Invalid username!");
      }

      let result = await service.join(req.body);
      res.json(Response("Join Successfully.", result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getAllUsers = {
  controller: async function getAllUsers(req, res, next) {
    try {
      const { userId } = req.query;

      let result = await service.getAllUsers(userId);

      return res.json(Response("Found successfully.", result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getSingleUser = {
  controller: async function getSingleUser(req, res, next) {
    try {
      let result = await service.getSingleUser(req.params.id);
      return res.json(Response("Found successfully.", result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.validateUsername = {
  controller: async function validateUsername(req, res, next) {
    try {
      let { username } = req.body;
      username = username.toLowerCase().trim();

      if (!username)
        throw CustomErrorHandler.badRequest("Please enter a username!");

      let result = await service.validateUsername(username);
      return res.json(Response("Username validate successfully.", result));
    } catch (err) {
      next(err);
    }
  },
};
