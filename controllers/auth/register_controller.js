const db = require("../../config/db_connection_config");
const bcrypt = require("bcrypt");
const { randomBytes, createHash } = require("crypto");

const registerAdmin = (req, res) => {
  const { username, email, password } = req.body;

  // make sure all fields are required
  if (!username || !email || !password)
    return res
      .status(401)
      .json({ status: "unauthorized", message: "All fields are required" });

  const sqlQuery = "SELECT * FROM admins WHERE email = ?";
  db.query(sqlQuery, [email], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ status: "Internal server error", message: err.message });

    // check if account with email address already exists
    if (data.length > 0)
      return res.status(409).json({
        status: "conflict",
        message: `Account with email address: ${email} already exists!`,
      });

    // hash client password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // generate email verification data
    const emailVerificatonTOken = randomBytes(7)
      .toString("base64")
      .replaceAll("/", "B");
    const hashedEmailVerificatonTOken = createHash("sha256")
      .update(emailVerificatonTOken)
      .digest("hex");

    const sqlInsertQuery =
      "INSERT INTO admins (username, name, email, password, email_verification_token) VALUES (?, ?, ?, ?, ?)";

    db.query(
      sqlInsertQuery,
      [username, username, email, hashedPassword, hashedEmailVerificatonTOken],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ status: "Internal server error", message: err.message });

        // console.log(hashedEmailVerificatonTOken);
        res.status(201).json({
          status: "created",
          message: "Your account was created successfully!",
        });
      }
    );
  });
};

module.exports = registerAdmin;
