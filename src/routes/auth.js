const express = require("express");
const router = express.Router();

const {
  join,
  getAllUsers,
  getSingleUser,
  validateUsername,
} = require("../controllers/auth.js");

//@route    POST /join
//@desc     User join
//@access   PUBLIC
router.post("/join", join.controller);

//@route    GET /users
//@desc     Get all users
//@access   PRIVATE
router.get("/users", getAllUsers.controller);

//@route    GET /users/id
//@desc     Get all users
//@access   PRIVATE
router.get("/users/:id", getSingleUser.controller);

//@route    POST /users/validateUsername
//@desc     Validate username
//@access   PRIVATE
router.post("/users/validateUsername", validateUsername.controller);

module.exports = router;
