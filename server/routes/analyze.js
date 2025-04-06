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
    //console.log("Editing drinks");
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

module.exports = router;