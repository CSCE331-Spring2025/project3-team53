const express = require("express");
const cors = require("cors");
const pool = require('./db');
require("dotenv").config();
const drinksRoutes = require("./routes/drinks");
const sendOrderRoutes = require("./routes/send_order");
const deleteItem = require("./routes/delete_item");
const editItem = require("./routes/edit_item");
const insertItem = require("./routes/insert_item");
const analyze = require("./routes/analyze");
const translateRouter = require("./routes/translate");
const login = require("./routes/login");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/drinks", drinksRoutes);
app.use("/api/send_orders", sendOrderRoutes);
app.use("/api/delete", deleteItem);
app.use("/api/edit", editItem);
app.use("/api/insert", insertItem);
app.use("/api/analyze", analyze);
app.use("/api/translate", translateRouter);
app.use("/api/login", login);



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
