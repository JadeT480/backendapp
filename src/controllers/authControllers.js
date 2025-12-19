const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // check if the user exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: "This email is already registered",
      });
    }

    // hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = await userModel.createUser({
      name,
      email,
      password_hash
    });
    return res.status(201).json(newUser);

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {

}

module.exports = { register, login };