require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) return console.log("Error connecting to database", err.message);

  console.log("Database connection successful");

  //   creating admins tables if it does not exists
  db.query(`CREATE TABLE IF NOT EXISTS admins (
        admin_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        email_verification_token VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        password_reset_token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci, ENGINE=InnoDB`);

  // creating posts table if it does not exists
  db.query(`CREATE TABLE IF NOT EXISTS posts (
      post_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      admin_id INT,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      image VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci, ENGINE=InnoDB`);

  // creating comments table if it does not exists
  db.query(`CREATE TABLE IF NOT EXISTS comments (
      comment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      post_id INT,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci, ENGINE=InnoDB`);

  // creating replies table if it does not exists
  db.query(`CREATE TABLE IF NOT EXISTS replies (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      comment_id INT,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci, ENGINE=InnoDB`);
});

module.exports = db;

module.exports = db;
