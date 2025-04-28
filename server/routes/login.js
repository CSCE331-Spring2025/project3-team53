const express = require("express");
const pool = require("../db");
const { fetch_request } = require("../../client/src/apiCall");

const router = express.Router();
router.post("/signup", async (req, res) => {
    try{
        const {username, password} = req.body;
        const exist = (await pool.query(`SELECT COUNT(1) as exist FROM login WHERE id = '${username}';`)).rows[0].exist;
        if(exist === "1"){
            return res.status(400).json({error: 'Username already exists'});
        }
        let sql = `INSERT INTO login (id, password, cachedcart) 
        VALUES ('${username}', '${password}', '');`
        try{
            await pool.query(sql);
        }
        catch(err){
            return res.status(400).json({message: "Query Error", error: err.message});
        }

        return res.status(200).json({message: "New User Created"})

    } catch (err) {
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

router.put("/signin", async (req, res) => {
    try{
        const {username, password, google} = req.body;
        let match;
        if(google){
            match = (await pool.query(`SELECT COUNT(1) as match FROM login 
                WHERE id = '${username}';`)).rows[0].match;    
        }
        else{
            match = (await pool.query(`SELECT COUNT(1) as match FROM login 
                WHERE id = '${username}' AND password = '${password}';`)).rows[0].match;    
        }
        if(match === "0"){
            return res.status(400).json({error: 'Username or Password doesn\'t match record'});
        }
        let sql = `SELECT cachedcart FROM login WHERE id = '${username}';`
        try{
            const result = (await pool.query(sql)).rows[0].cachedcart;
            return res.status(200).json({data: result, message: "Successfully Logged In"})
        }
        catch(err){
            return res.status(400).json({message: "Query Error", error: err.message});
        }

    } catch (err) {
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

router.put("/save-order", async (req, res) => {
    try{
        const {username, cart} = req.body;
        const exist = (await pool.query(`SELECT COUNT(1) as exist FROM login WHERE id = '${username}';`)).rows[0].exist;
        if(exist === "0"){
            return res.status(400).json({error: 'Username does not exist'});
        }

        let sql = `UPDATE login SET cachedcart = '${cart}' WHERE id = '${username}';`
        try{
            await pool.query(sql)
            return res.status(200).json({message: "Customer Cart saved"})
        }
        catch(err){
            return res.status(400).json({message: "Query Error", error: err.message});
        }

    } catch (err) {
        return res.status(500).json({ message:"Server error", error: err.message });
    }
});

module.exports = router;