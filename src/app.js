require("dotenv").config();
const express = require("express")
const session = require("express-session");
const passport = require("passport");

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const products = require("./routes/products");

require("./config/passport");

const app = express()

app.use(express.json());

// Sessions - always before passport.session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/users", authRoutes);

app.use("/products", products);

// homepage route - checks that database is connected
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`
      <h1>Database time: ${result.rows[0].now}</h1>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
});

module.exports = app;
