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


/**
 * Gets all posts in order of date posted.
 */
app.get(ENDPOINT + '/posts', (req, res) => {
    const sql = "SELECT * FROM posts_feed";
    db.query(sql, (err, result) => {
        if (err) throw err;
        let resultText = JSON.stringify(result);
        res.end(resultText);
    });
});


/**
 * Gets the profile information for a given user.
 */
app.get(ENDPOINT + '/profiles/:userID', (req, res) => {
    const id = req.params.userID;
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


/**
 * Creates a new profile with a given username, full name and if the profile was a volunteer.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles?id=value&name=value&isVolunteer=value
 */
app.post(ENDPOINT + '/profiles', (req, res) => {
    const userID = req.query.id;
    const fullname = req.query.name;
    const isVolunteer = parseInt(req.query.isVolunteer);
    const sql = `CALL create_new_profile("${userID}", "${fullname}", ${isVolunteer});`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success creating profile");
        } else {
            res.send("Error creating profile");
        }
    });
});


/**
 * Associates a new skill to a user.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/skills?id=value&skill=value
 */
app.put(ENDPOINT + '/profiles/skills', (req, res) => {
    const userID = req.query.id;
    const skill = req.query.skill;
    const sql = `CALL new_skill_entry("${userID}", "${skill}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success adding skill");
        } else {
            res.send("Error adding skill");
        }
    });
});


/**
 * Unassociates a skill to a user.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/skills?id=value&skill=value
 */
app.delete(ENDPOINT + '/profiles/skills', (req, res) => {
    const userID = req.query.id;
    const skill = req.params.skill;
    const sql = `CALL remove_skill_entry("${userID}", "${skill}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success removing skill");
        } else {
            res.send("Error removing skill");
        }
    });
});


/**
 * Adds a new education entry to a user's profile.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/education?id=value&start=value&end=value&gpa=value&type=value&img=value&name=value
 */
app.post(ENDPOINT + '/profiles/education', (req, res) => {
    const userID = req.query.id;
    const startDate = req.query.start;
    const endDate = req.query.end;
    const gpa = req.query.gpa;
    const certificationType = req.query.type;
    const imageUrl = req.query.img;
    const schoolName = req.query.name;
    const sql = `CALL new_education_entry(
        "${userID}", "${startDate}", "${endDate}", "${gpa}", "${certificationType}", "${imageUrl}", "${schoolName}"
        );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success adding education");
        } else {
            res.send("Error adding education");
        }
    });
});

/**
 * Edits an existing education entry in a users profile
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/education?id=value&start=value&end=value&gpa=value&type=value&img=value&name=value
 */
app.put(ENDPOINT + '/profiles/education', (req, res) => {
    const educationID = req.query.id;
    const startDate = req.query.start;
    const endDate = req.query.end;
    const gpa = req.query.gpa;
    const certificationType = req.query.type;
    const imageUrl = req.query.img;
    const schoolName = req.query.name;
    const sql = `CALL edit_education_entry(
        "${educationID}", "${startDate}", "${endDate}", "${gpa}", "${certificationType}", "${imageUrl}", "${schoolName}"
        );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success editing education");
        } else {
            res.send("No changes were made to education");
        }
    });
});


// Adds a new experience entry to a user's profile
app.post(ENDPOINT + '/profiles/experience/:userID/:startDate/:endDate/:jobTitle/:imageUrl/:employer', (req, res) => {
    const userID = req.params.userID;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const jobTitle = req.params.jobTitle;
    const imageUrl = req.params.imageUrl;
    const employer = req.params.employer;
    const sql = `CALL new_experience_entry(
        "${userID}", "${startDate}", "${endDate}", "${jobTitle}", "${imageUrl}", "${employer}");
        );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success adding experience");
        } else {
            res.send("Error adding experience");
        }
    });
});


// Edits an existing experience entry in a users profile
app.put(ENDPOINT + '/profiles/experience/:experienceID/:startDate/:endDate/:jobTitle/:imageUrl/:employer', (req, res) => {
    const experienceID = req.params.experienceID;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const jobTitle = req.params.jobTitle;
    const imageUrl = req.params.imageUrl;
    const employer = req.params.employer;
    const sql = `CALL edit_experience_entry(
        "${experienceID}", "${startDate}", "${endDate}", "job title", "image url", "employer"
        );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success editing experience");
        } else {
            res.send("No changes were made to experience");
        }
    });
});


// Adds a new award/certificate to a user's profile
app.post(ENDPOINT + '/profiles/awardsAndCertification/:userID/:awardTitle/:dateReceived/:imageUrl', (req, res) => {
    const userID = req.params.userID;
    const awardTitle = req.params.awardTitle;
    const dateReceived = req.params.dateReceived;
    const imageUrl = req.params.imageUrl;
    const sql = `CALL new_award_entry("${userID}", "${awardTitle}", "${dateReceived}", "${imageUrl}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success adding award/certificate");
        } else {
            res.send("Error adding award/certificate");
        }
    });
});


// Edits an award/certificate entry in a user's profile
app.put(ENDPOINT + '/profiles/awardsAndCertification/:awardID/:awardTitle/:dateReceived/:imageUrl', (req, res) => {
    const awardID = req.params.awardID;
    const awardTitle = req.params.awardTitle;
    const dateReceived = req.params.dateReceived;
    const imageUrl = req.params.imageUrl;
    const sql = `CALL edit_award_entry("${awardID}", "${awardTitle}", "${dateReceived}", "${imageUrl}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result['affectedRows']) {
            res.send("Success editing award/certificate");
        } else {
            res.send("No changes were made to award/certificate");
        }
    });
});


/*
TODO:
-Profile
DONEa) Add skills (PUT - new_skill_entry)
DONEb) Remove skills (DELETE - remove_skill_entry)
DONEc) Add education (POST - new_education_entry)
DONEd) Edit education (PUT - edit_education_entry)
DONEe) Add experience (POST - new_experience_entry)
DONEf) Edit experience (PUT - edit_experience_entry)
DONEg) Add award/certification (POST - new_award_entry)
DONEh) Edit award/certification (PUT - edit_award_entry)
    i) Edit profile pic
    h) Edit bio


*/


app.listen();