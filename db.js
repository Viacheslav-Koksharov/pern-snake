const Pool = require("pg").Pool;
require("dotenv").config();
const devConfig = {
   user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE 
}
// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const prodConfig= process.env.HEROKU_POSTGRESQL_GREEN_URL//heroku addons



// const pool = new Pool({
//     connectiongString: process.env.NODE_ENV === "production" ? prodConfig : devConfig
// });
const pool = new Pool( process.env.NODE_ENV === "production" ? prodConfig : devConfig
);
module.exports = pool;