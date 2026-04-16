const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "stopwatch_db"
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected");
    }
});

// Save lap
app.post("/lap", (req, res) => {
    const { time } = req.body;

    const sql = "INSERT INTO laps (time) VALUES (?)";
    db.query(sql, [time], (err, result) => {
        if (err) return res.send(err);
        res.send("Lap saved");
    });
});

// Get laps
app.get("/laps", (req, res) => {
    db.query("SELECT * FROM laps", (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});