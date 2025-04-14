const express = require("express");
const pool = require("../db");

const router = express.Router();

/*
request takes value of (date, start, end) 
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
            res.status(200).json({data: result.rows});
        }
        catch(err){
            res.status(400).json({message:"Query error", error: err.message});
        }
    } 
    catch (err) {
        res.status(500).json({message:"Server error", error: err.message});
    }
});

/*
request takes value of (start, end) 
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
                    used.concat(row.add_ons.split(' '));
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

            //console.log(Object.fromEntries(ingredient_count));
            res.status(200).json({data: Object.fromEntries(ingredient_count)});
        }
        catch(err){
            res.status(400).json({message:"Query error", error: err.message});
        }
    } 
    catch (err) {
        res.status(500).json({message:"Server error", error: err.message});
    }
});

module.exports = router;