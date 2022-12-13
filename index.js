const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 8005;

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./build"));

if (process.env.NODE_ENV === "production") {
    //server static component
    //npm run build
    app.use(express.static(path.join(__dirname, "build")));
}

//ROUTES//
//create a score
app.post("/snake", async (req, res) => {
    try {
        const newScore = await pool.query(
            "INSERT INTO snake (name, score) VALUES($1, $2) RETURNING *",
            [req.body.name, req.body.score]
        );
        res.json(newScore.rows[0]);
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

//delete all score
app.delete("/snake", async (_, res) => {
    try {
        const deleteScores = await pool.query("DELETE FROM snake");
        res.json(deleteScores.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});
