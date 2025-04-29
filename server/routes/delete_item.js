const express = require("express");
const pool = require("../db");

const router = express.Router();

/*
request takes value of (table_id, id) and deletes them from the table
    table_id: 1 = drinks, 2 = employees, 3 = inventory
    id: id of tem to be deleted
*/
router.delete("/", async (req, res) => {
    try {
        const {table_id, id} = req.body;
        if(!Number.isInteger(table_id) || !Number.isInteger(id)){
          return res.status(400).json({error: 'Ids not integers'});
        }
        let table;
        switch (table_id) {
            case 1:
                table = "drinks";
                break;
            case 2:
                table = "employees";
                break;
            case 3:
                table = "inventory";
                break;
            default:
                return res.status(400).send('Invalid table id');
        }

        let sql = `DELETE FROM ${table} WHERE id = ${id}`;
        try{
            const result = await pool.query(sql);
        }
        catch(err){
            return res.status(400).json({ message:"Query error", error: err.message });
        }
        return res.status(200).json({ message:"Item deleted"});
    } 
    catch (err) {
        //console.error(err.message);
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

module.exports = router;