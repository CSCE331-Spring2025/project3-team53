const express = require("express");
const pool = require("../db");

const router = express.Router();

/*
request takes value of (drink_id, new_price)
    updates the price of the drink
*/
router.put("/drink", async (req, res) => {
    console.log("Editing drinks");
    console.log("Request body:", req.body);
    try {
        const {drink_id, new_price} = req.body;
        if(!Number.isInteger(drink_id) || !(typeof new_price === 'number')){
            return res.status(400).json({error: 'Invalid Input'});
        }

        let sql = `UPDATE drinks SET item_price = ${new_price} WHERE id = ${drink_id};`;
        console.log(sql);
        try{
            await pool.query(sql);
        }
        catch(err){
            return res.status(400).json({ message:"Query error", error: err.message });
        }
        return res.status(200).json({ message:"Drink price updated"});
        //console.log('Drink updated');
    } 
    catch (err) {
        //console.error(err.message);
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

/*
request takes value of (inventory_id, value, set_value)
    updates the quality of the item 
    set_value: false when adding or subtracting by value, true when setting quality to value
*/
router.put("/inventory", async (req, res) => {
    //console.log("Editing inventory");
    try {
        const {inventory_id, value, set_value} = req.body;
        if(!Number.isInteger(inventory_id) || !Number.isInteger(value) || !(typeof set_value === "boolean")){
          return res.status(400).json({error: 'Invalid Input'});
        }
        let quantity;
        (set_value)?quantity = value: quantity = `quantity + ${value}`;
        let sql = `UPDATE inventory SET quantity = ${quantity} WHERE id = ${inventory_id};`;
        //console.log(sql);
        try{
            await pool.query(sql);
        }
        catch(err){
            return res.status(400).json({ message:"Query error", error: err.message });
        }
        return res.status(200).json({ message:"Inventory updated"});
        //console.log('Inventory updated');
    } 
    catch (err) {
        //console.error(err.message);
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

/*
request takes value of (employee_id, name, position, store_id)
    update the employee with employee_id to (name, position, store_id)
*/
router.put("/employee", async (req, res) => {
    //console.log("Editing employee");
    try {
        const {employee_id, name, position, store_id} = req.body;
        if(!Number.isInteger(employee_id) || !Number.isInteger(store_id) || 
        !(typeof name === "string") || !(typeof position === "string")){
          return res.status(400).json({error: 'Invalid Input'});
        }
        let sql = `UPDATE employees 
            SET emp_name = '${name}',
                store_id = ${store_id},
                position = '${position}' 
            WHERE id = ${employee_id};`;
        //console.log(sql);
        try{
            await pool.query(sql);
        }
        catch(err){
            return res.status(400).json({ message:"Query error", error: err.message });
        }
        return res.status(200).json({ message:"Employee updated"});
        //console.log('Employee updated');
    } 
    catch (err) {
        //console.error(err.message);
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

module.exports = router;