const express = require("express");
const pool = require("../db");

const router = express.Router();

/*
request takes an array of (employee_id, drink_id, ice_level, sugar_level, [add_ons]) and creates a new order in table
for example an order with three drinks have req.body:
    [
        [1, 15, 2, 3, ['black_pearl', 'mini_pearl']],
        [1, 2, 1, 2, []],
        [1, 3, 4, 4, ['pudding']]
    ]
  }
*/
router.post("/", async (req, res) => {
    //console.log("Begin sending order");
    try {
        const orders = req.body;
        if(!Array.isArray(orders) || orders.length === 0){
          return res.status(400).json({error:'Invalid or empty queries array'});
        }
        const order_number = (await pool.query("SELECT max(order_number)+1 AS num FROM orders;")).rows[0].num;
        const timenow = (new Date()).toISOString().replace("T"," ").substring(0, 19);

        let employee_id, drink_id, ice_level, sugar_level, add_ons_arr, price;
        for(let i = 0; i < orders.length; ++i){
          employee_id = orders[i][0];
          drink_id = orders[i][1];
          ice_level = orders[i][2];
          sugar_level = orders[i][3];
          add_ons_arr = orders[i][4];
          price = (await pool.query(`SELECT item_price AS num FROM drinks WHERE id = ${drink_id};`)).rows[0].num;
          price = Number(price);
          add_on_text = add_ons_arr.join(" ");
          add_ons_arr.forEach(element => {
            if(element === "Creama" || element === "Ice Cream"){
              price += 1;
            }
            else{
              price += 0.75;
            }
          });
          let sql = `INSERT INTO orders (order_number, employee_id, drink_id, ice_level, sugar_level, add_ons, order_date, price) 
          VALUES (${order_number}, ${employee_id}, ${drink_id}, ${ice_level}, ${sugar_level}, '${add_on_text}', '${timenow}', ${price});`
          try{
            const result = await pool.query(sql);
          }
          catch(err){
            res.status(400).json({message: "Query Error", error: err.message});
          }
        }
        //console.log("Order logged");
        res.status(200).json({message: "Order sent"});
    } catch (err) {
        //console.error(err.message);
        res.status(500).json({ message:"Server error", error: err.message });
    }
});

module.exports = router;