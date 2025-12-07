require("dotenv").config();
const express = require("express")
const pool = require("./config/db");
const app = express()
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

// Routes
app.use("/users", authRoutes);

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
