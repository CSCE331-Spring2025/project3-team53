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
            res.status(400).json({ message:"Query error", error: err.message });
        }
        res.status(200).json({ message:"Drink inserted"});
        console.log('Drink inserted');
    } 
    catch (err) {
        res.status(500).json({ message:"Server error", error: err.message });
    }
});

/*
request takes value of (name, type, store_id)
    insert into inventory
*/
router.put("/inventory", async (req, res) => {
    console.log("Insert inventory");
    try {
        const {name, type, store_id} = req.body;
        if(typeof name !== 'string' || typeof type !== 'string' ||
        !Number.isInteger(store_id)){
            return res.status(400).json({error: 'Invalid Input'});
        }

        let sql = `INSERT INTO inventory (name,type,store_id,quantity) 
        VALUES('${name}', '${type}', ${store_id}, 0)`;
        console.log(sql);
        try{
            await pool.query(sql);
        }
        catch(err){
            res.status(400).json({ message:"Query error", error: err.message });
        }
        res.status(200).json({ message:"Inventory inserted"});
        console.log('Inventory inserted');
    } 
    catch (err) {
        res.status(500).json({ message:"Server error", error: err.message });
    }
});

/*
request takes value of (name, position, store_id)
    insrt the employee
*/
router.put("/employee", async (req, res) => {
    console.log("Insert employee");
    try {
        const {name, position, store_id} = req.body;
        if(typeof name !== 'string' || typeof position !== 'string' ||
        !Number.isInteger(store_id)){
            return res.status(400).json({error: 'Invalid Input'});
        }

        let sql = `INSERT INTO employees (emp_name, position, store_id)
        VALUES('${name}', '${position}', ${store_id})`;
        console.log(sql);
        try{
            await pool.query(sql);
        }
        catch(err){
            res.status(400).json({ message:"Query error", error: err.message });
        }
        res.status(200).json({ message:"Employee inserted"});
        console.log('Employee inserted');
    } 
    catch (err) {
        //console.error(err.message);
        res.status(500).json({ message:"Server error", error: err.message });
    }
});

module.exports = router;