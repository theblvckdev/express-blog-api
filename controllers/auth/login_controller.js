require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../../config/db_connection_config");
// const signJWTtoekn = require("../../utils/sign_JWT");
const jwt = require("jsonwebtoken");

const logiAdmin = (req, res) => {
  const { email, password } = req.body;

  // make sure all fields are required
  if (!email || !password)
    return res
      .status(401)
      .json({ status: "unauthorized", message: "All fields are required" });

  const sqlQuery = "SELECT * FROM admins WHERE email = ?";
  db.query(sqlQuery, [email], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ status: "Internal server error", message: err.message });

    if (data.length === 0)
      return res.status(401).json({
        status: "Unauthorized",
        message: "Email address not found, please create an account!",
      });

    // compare hashed password to client password
    const pwdMatch = bcrypt.compareSync(password, data[0].password);

    if (!pwdMatch)
      return res.status(401).json({
        status: "Unauthorized",
        message: "Invalid email address or password!",
      });

    // create JWT access token
    const accessToken = jwt.sign(
      { id: data[0].admin_id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
      }
    );

    const refreshToken = jwt.sign(
      { id: data[0].admin_id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      }
    );

    res.status(200).json({
      status: "ok",
      message: "Your logged into your account successfully.",
      accessToken,
      refreshToken,
    });
  });
};

module.exports = logiAdmin;
