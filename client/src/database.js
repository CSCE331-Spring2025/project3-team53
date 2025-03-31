import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config'

/*
Example Usage on other files
    import { Engine } from './database.js';

    const test = new Engine();
    console.log(await test.query('SELECT * FROM drinks;'));
    test.close();
*/

class Engine{
    constructor(){
        this.client = new Client(
            {
                user: process.env.PSQL_USER,
                host: process.env.PSQL_HOST,
                database: process.env.PSQL_DATABASE,
                password: process.env.PSQL_PASSWORD,
                port: process.env.PSQL_PORT,
                ssl: {rejectUnauthorized: false}
            }
        );

        this.client
            .connect()
            .then(() =>{
                console.log("Connected to database");
            })
            .catch((err) => {
                console.error(err.message);
        });

        this.client.query('SET search_path TO restaurant_schema;', (err, res) =>{
            if(!err){
                console.log('Connected to restaurant schema');
            }
            else{
                console.log(err.message);
            }
        });
    }
    
    async query(sql){
        try {
            const result = await this.client.query(sql);
            console.log(result.rows);
            return result.rows;
        } 
        catch (error) {
            console.error('Error executing query:', error);
        }
    }

    async close(){
        try{
            await this.client.end();
            console.log('Engine disconnected');
        }
        catch(err){
            console.error('Error disconnecting client');
        }
    }
}

export {Engine};