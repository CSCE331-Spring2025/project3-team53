const express = require("express");
const cors = require("cors");
const pool = require('./db');
require("dotenv").config();
const drinksRoutes = require("./routes/drinks");
const sendOrderRoutes = require("./routes/send_order");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/drinks", drinksRoutes);
app.use("/api/send_orders", sendOrderRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

pool.connect()
    .then(client => {
        console.log('Connected to the database');
        client.release();
    })
    .catch(err => console.error('Error connecting to the database:', err));
