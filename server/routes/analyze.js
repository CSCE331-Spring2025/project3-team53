const express = require("express");
const pool = require("../db");

const router = express.Router();

/*
request takes query of (date, start, end) 
    date: yyyy:mm:dd format
    start: start hour in 24-hr format
    end: end hour in 24-hr format
outputs amount of dollar, drinks, and orders on each hour, wihin the specified hour range
*/
router.get("/order_history", async (req, res) => {
    try {
        const {date, start, end} = req.query;
        if(isNaN(Date.parse(date))){
            return res.status(400).json({error:'Invalid date format'});
        }
        if(start > end || !Number.isInteger(parseInt(start)) || !Number.isInteger(parseInt(end))){
            return res.status(400).json({error:'Invalid start or end hour'});
        }
        if((parseInt(start)) < 11 || (parseInt(end)) > 22){
            return res.status(400).json({error:'Start or end hour out of range; valid range in [11,22]'});
        }

        let start_date = `${date} ${start}:00:00`;
        let end_date = `${date} ${end}:59:59`;
        let sql = `
                    SELECT DATE_PART('hour', order_date) as hr,
                    SUM(price) as sum_dollar,
                    COUNT(id) as sum_drinks,
                    COUNT(distinct order_number) as sum_orders 
                    FROM orders
                    WHERE order_date BETWEEN '${start_date}' AND '${end_date}'
                    GROUP BY DATE_PART('hour', order_date)
                    ORDER BY DATE_PART('hour', order_date) 
                    `;
        try{
            const result = await pool.query(sql);
            return res.status(200).json({data: result.rows});
        }
        catch(err){
            return res.status(400).json({message:"Query error", error: err.message});
        }
    } 
    catch (err) {
        return res.status(500).json({message:"Server error", error: err.message});
    }
});

/*
request takes query of (start, end) 
    start: yyyy:mm:dd format
    end: yyyy:mm:dd format
outputs amount of each ingredient used between the dates
*/
router.get("/ingredients_use", async (req, res) => {
    try {
        const {start, end} = req.query;
        if(isNaN(Date.parse(start)) || isNaN(Date.parse(end))){
            return res.status(400).json({error:'Invalid date format'});
        }
        if(Date.parse(start) > Date.parse(end) ){
            return res.status(400).json({error:'Start date can\'t be later than before End date'});
        }

        let sql = `
                SELECT ingredients, add_ons FROM orders
                LEFT JOIN drinks
                ON orders.drink_id = drinks.id
                WHERE order_date BETWEEN '${start}' AND '${end}'`;
        try{
            //console.log(sql);
            let result = (await pool.query(sql)).rows;
            let ingredient_count = new Map();
            //console.log(result);
            result.forEach(row => {
                let used = row.ingredients.split(' ');
                if(row.add_ons){
                    used = used.concat(row.add_ons.split(' '));
                }

                used.forEach(element => {
                    if(ingredient_count.has(element)){
                      ingredient_count.set(
                        element, 
                        ingredient_count.get(element) + 1
                      );
                    }
                    else{
                      ingredient_count.set(
                        element, 
                        1
                      );
                    }
                });
            });

            //console.log(ingredient_count);
            return res.status(200).json({data: Array.from(ingredient_count.entries())});
        }
        catch(err){
            return res.status(400).json({message:"Query error", error: err.message});
        }
    } 
    catch (err) {
        return res.status(500).json({message:"Server error", error: err.message});
    }
});

/*
request takes value of (employee_id) 
    employee_id: id of manager who sent the request
outputs data on the inventory for the store of the manager
*/
router.get("/inventory", async (req, res) => {
    try {
        const {employee_id} = req.query;
        if(!Number.isInteger(Number(employee_id))){
            return res.status(400).json({error:`Employee id ${employee_id} is not integer`});
        }
        let sql = `
                SELECT id, name, type, quantity FROM inventory 
                WHERE store_id = (SELECT store_id FROM employees WHERE id = ${employee_id}) 
                ORDER BY id ASC`;
        try{
            //console.log(sql);
            let result = (await pool.query(sql)).rows;
            //console.log(result);
            return res.status(200).json({data: result});
        }
        catch(err){
            return res.status(400).json({message:"Query error", error: err.message});
        }
    } 
    catch (err) {
        return res.status(500).json({message:"Server error", error: err.message});
    }
});

/*
request takes value of (employee_id) 
    employee_id: id of manager who sent the request
outputs data on the employees for the store of the manager
*/
router.get("/employee", async (req, res) => {
    try {
        const {employee_id} = req.query;
        if(!Number.isInteger(Number(employee_id))){
            return res.status(400).json({error:`Employee id ${employee_id} is not integer`});
        }
        let sql = `
                SELECT id, emp_name, position, store_id FROM employees 
                WHERE store_id = (SELECT store_id FROM employees WHERE id = ${employee_id}) 
                ORDER BY id ASC`;
        try{
            //console.log(sql);
            let result = (await pool.query(sql)).rows;
            return res.status(200).json({data: result});
        }
        catch(err){
            return res.status(400).json({message:"Query error", error: err.message});
        }
    } 
    catch (err) {
        return res.status(500).json({message:"Server error", error: err.message});
    }
});

/*
Returns the all drink info in menu 
*/
router.get("/menu", async (req, res) => {
    try {
        let sql = `SELECT * FROM drinks ORDER BY id ASC`;
        try{
            //console.log(sql);
            let result = (await pool.query(sql)).rows;
            return res.status(200).json({data: result});
        }
        catch(err){
            return res.status(400).json({message:"Query error", error: err.message});
        }
    } 
    catch (err) {
        return res.status(500).json({message:"Server error", error: err.message});
    }
});

/*
Returns the price of a drink + addons
    drink_id: id of the drink
    add_ons: array containing the add ons on the drink
*/
router.put("/order_price", async (req, res) => {
    try {
        const {drink_id, add_ons} = req.body;
        if(!Number.isInteger(drink_id) || !Array.isArray(add_ons)){
            return res.status(400).json({error:`Invalid input`});
        }
        let sql = `SELECT item_price FROM drinks WHERE id = ${drink_id}`;
        try{
            let price = Number.parseFloat((await pool.query(sql)).rows[0].item_price);
            add_ons.forEach(element => {
                if(element === "creama" || element === "ice_cream"){
                  price += 1;
                }
                else{
                  price += 0.75;
                }});
            return res.status(200).json({data: price});
        }
        catch(err){
            return res.status(400).json({message:"Query error", error: err.message});
        }
    } 
    catch (err) {
        return res.status(500).json({message:"Server error", error: err.message});
    }
});
module.exports = router;