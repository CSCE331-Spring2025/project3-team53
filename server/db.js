const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT || 5432,
    ssl: { rejectUnauthorized: false },
});

pool.on('connect', async (client) => {
    try{
        await client.query('SET search_path TO restaurant_schema');
        console.log('Connected to schema');
    }
    catch(err){
        console.error('Error', err);
    }
});

module.exports = pool;

// Graceful shutdown on SIGINT
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});