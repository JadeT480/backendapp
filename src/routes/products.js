const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/* Get all products available */
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

/* Get a single product */
router.get("/:product_id", async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;