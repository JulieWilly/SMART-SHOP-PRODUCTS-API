import pkg from 'pg'
const { Pool } = pkg;
import { config } from 'dotenv'

config();
const pool = new Pool({
    user: process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.PORT,
    host:process.env.HOST
});


export default pool;


