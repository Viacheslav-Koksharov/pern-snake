const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
//create a score
app.post("/snake", async (req, res) => {
    try {
        const newScore = await pool.query(
            "INSERT INTO snake (name, score) VALUES($1, $2) RETURNING *",
            [req.body.name, req.body.score]
        );
        res.json(newScore.rows[0]);
        // console.log(req.body)
    } catch (err) {
        console.error(err.message);
    }
});

//get all score
app.get("/snake", async (_, res) => {
    try {
        const allScores = await pool.query("SELECT * FROM snake ORDER BY score DESC  LIMIT 10");
        res.json(allScores.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
  });