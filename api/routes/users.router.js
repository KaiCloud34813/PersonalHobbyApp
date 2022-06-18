const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.route("/")
.post(usersController.register);

router.route("/login")
.post(usersController.login);

module.exports = router;
