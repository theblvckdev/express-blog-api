const express = require("express");
const registerAdmin = require("../../controllers/auth/register_controller");
const logiAdmin = require("../../controllers/auth/login_controller");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", logiAdmin);

module.exports = router;
