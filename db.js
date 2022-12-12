const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "slavik",
    host: "localhost",
    port: 5432,
    database: "pernsnake"
});

module.exports = pool;