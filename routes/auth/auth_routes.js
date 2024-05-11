const express = require("express");
const registerAdmin = require("../../controllers/auth/register_controller");

const router = express.Router();

router.post("/register", registerAdmin);

module.exports = router;
