const express = require("express");
const pool = require("../db");

const router = express.Router();

/*
request takes value of (name, type, [ingredients], [amount], price)
    insert the drink
*/
router.put("/drink", async (req, res) => {
    console.log("Inserting drinks");
    try {
        const {name, type, ingredient, amount, price} = req.body;
        if(typeof name !== 'string' || typeof type !== 'string' ||
        !(Array.isArray(ingredient)) || !(Array.isArray(amount)) || 
        ingredient.length !== amount.length || typeof price !== 'number'){
            return res.status(400).json({error: 'Invalid Input'});
        }

        const ingredient_text = ingredient.join(" ");
        const amount_text = amount.join(" ");
        let sql = `INSERT INTO drinks 
        (drink_name, drink_type, ingredients, ingredients_amount, item_price) 
        VALUES('${name}', '${type}', '${ingredient_text}', '${amount_text}', ${price})`;
        console.log(sql);
        try{
            await pool.query(sql);
        }
        catch(err){
            console.log(err);
            return res.status(400).json({ message:"Query error", error: err.message });
        }
        return res.status(200).json({ message:"Drink inserted"});
    } 
    catch (err) {
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

/*
request takes value of (name, type, store_id)
    insert into inventory
*/
router.put("/inventory", async (req, res) => {
    console.log("Insert inventory");
    try {
        const {name, type, store_id, calories} = req.body;
        if(typeof name !== 'string' || typeof type !== 'string' ||
        !Number.isInteger(store_id)){
            return res.status(400).json({error: 'Invalid Input'});
        }

        let sql = `INSERT INTO inventory (name,type,store_id,quantity,calories) 
        VALUES('${name}', '${type}', ${store_id}, 0, ${calories})`;
        console.log(sql);
        try{
            await pool.query(sql);
        }
        catch(err){
            return res.status(400).json({ message:"Query error", error: err.message });
        }
        return res.status(200).json({ message:"Inventory inserted"});
        console.log('Inventory inserted');
    } 
    catch (err) {
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

/*
request takes value of (name, position, store_id)
    insrt the employee
*/
router.put("/employee", async (req, res) => {
    try {
        const { name, position, store_id } = req.body;
        
        // Validate input
        if (typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ error: 'Invalid employee name' });
        }
        if (!['employee', 'manager'].includes(position)) {
            return res.status(400).json({ error: 'Invalid position' });
        }
        if (![1, 2, 3].includes(store_id)) {
            return res.status(400).json({ error: 'Invalid store ID' });
        }

        // Safe parameterized query
        const result = await pool.query(
            `INSERT INTO employees (emp_name, position, store_id)
             VALUES($1, $2, $3) RETURNING *`,
            [name.trim(), position, store_id]
        );

        return res.status(201).json({
            message: "Employee inserted successfully",
            employee: result.rows[0]
        });
    } catch (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ 
            error: 'Internal server error',
            details: err.message 
        });
    }
});

module.exports = router;