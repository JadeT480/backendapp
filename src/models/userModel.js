const pool = require("../config/db");

// find the user by email
async function findByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1", 
    [email]
  );
  return result.rows[0];
}

// create a new user
async function createUser({ name, email, password_hash }) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, created_at) 
     VALUES ($1, $2, $3, NOW())
     RETURNING user_id, name, email, created_at`,
    [name, email, password_hash]
  );
  return result.rows[0];
}

module.exports = { findByEmail, createUser };
