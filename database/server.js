const ENDPOINT = "/karma/v1";

const filter = require('./modules/object_parsing');
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


// Gets all posts in order of date posted.
app.get(ENDPOINT + '/posts', (req, res) => {
    const sql = "SELECT * FROM posts_feed";
    db.query(sql, (err, result) => {
        if (err) throw err;
        let resultText = JSON.stringify(result);
        res.end(resultText);
    });
});


// Gets the profile information for a given user
app.get(ENDPOINT + '/profiles/:id', (req, res) => {
    const id = req.params.id;
    const sql = `CALL get_profile_info('${id}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        let response = result[0];
        let profile = {
            info: filter.profile(response[0]),
            education: filter.education(response),
            skills: filter.skills(response),
            experience: filter.experience(response),
            certifications: filter.certifications(response)
        };
        res.end(JSON.stringify(profile));
    });
});


// Creates a new profile with a given username, full name and if the profile was a volunteer
app.post(ENDPOINT + '/profiles/:username/:fullname/:isVolunteer', (req, res) => {
    const username = req.params.username;
    let fullname = req.params.fullname;
    fullname = fullname.replace("%", " ");
    const isVolunteer = parseInt(req.params.isVolunteer);
    const sql = `CALL create_new_profile("${username}", "${fullname}", ${isVolunteer});`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success creating profile");
        } else {
            res.send("Error creating profile");
        }
    });
});

/*
TODO:
-Profile
    a) Add skills (PUT - new_skill_entry)
    b) Remove skills (DELETE - remove_skill_entry)
    c) Add education (POST - new_education_entry)
    d) Edit education (PUT - _______)
    e) Add experience (POST - new_experience_entry)
    f) Edit experience (PUT - _______)
    g) Add award/certification (POST - new_award_entry)
    h) Edit award/certification (PUT - _____)


*/


app.listen();