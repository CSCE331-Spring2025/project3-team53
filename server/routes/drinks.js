const express = require("express");
const pool = require("../db");

const router = express.Router();


router.get("/Milk-Tea", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Milk Tea'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/Fresh-Milk", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Fresh Milk'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/Crema", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Creama'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/Brewed-Tea", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Brewed Tea'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/Fruit-Tea", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Fruit Tea'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/Ice-Blended", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Ice Blended'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/Specialty", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Special'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/Mojito", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, drink_name FROM drinks WHERE drink_type = 'Mojito'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;