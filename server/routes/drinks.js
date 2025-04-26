const express = require("express");
const pool = require("../db");

const router = express.Router();


//API calls to dynamically fetch drink categories from DB
router.get("/milk-tea", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Milk Tea'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/fresh-milk", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Fresh Milk'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/crema", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Creama'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/brewed-tea", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Brewed Tea'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/fruit-tea", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Fruit Tea'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/ice-blended", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Ice Blended'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/specialty", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Special'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/mojito", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Mojito'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;