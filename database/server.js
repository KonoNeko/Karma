const ENDPOINT = "/karma/v1";

const express = require("express");
const app = express();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "marlonfa_admin",
    password: "marlonfa_admin",
    database: "marlonfa_karma"
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
app.use(express.urlencoded( {extended: true} ));



app.get(ENDPOINT + '/posts', (req, res) => {
    const sql = "SELECT * FROM posts_feed";
    db.query(sql, (err, result) => {
        if (err) throw errl
        let resultText = JSON.stringify(result);
        res.end(resultText);
    });
});

app.get(ENDPOINT + '/profiles/:id', (req, res) => {
    const id = req.params.id;
    let sql = `CALL get_profile_info('${id}');`;
    db.query(sql, (err, result) => {
        if (err) throw errl
        let resultText = JSON.stringify(result);
        res.end(resultText);
    });
});

app.listen();