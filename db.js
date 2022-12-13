const Pool = require("pg").Pool;
require("dotenv").config();
// const devconfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE,
// }
const devconfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.
    PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const proConfig = process.env.DATABASE_URL;

const pool = new Pool(
    {
        connectionString: process.env.NODE_ENV === "production" ? proConfig : devconfig
    });

module.exports = pool;