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
        if (result.affectedRows) {
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
        if (result.affectedRows) {
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
    const skill = req.query.skill;
    const sql = `CALL remove_skill_entry("${userID}", "${skill}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
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
        if (result.affectedRows) {
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
        ${educationID}, "${startDate}", "${endDate}", "${gpa}", "${certificationType}", "${imageUrl}", "${schoolName}"
        );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success editing education");
        } else {
            res.send("No changes were made to education");
        }
    });
});


/**
 * Adds a new experience entry to a user's profile.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/experience?id=value&start=value&end=value&job=value&img=value&employer=value
 */ 
app.post(ENDPOINT + '/profiles/experience', (req, res) => {
    const userID = req.query.id;
    const startDate = req.query.start;
    const endDate = req.query.end;
    const jobTitle = req.query.job;
    const imageUrl = req.query.img;
    const employer = req.query.employer;
    const sql = `CALL new_experience_entry(
        "${userID}", "${startDate}", "${endDate}", "${jobTitle}", "${imageUrl}", "${employer}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success adding experience");
        } else {
            res.send("Error adding experience");
        }
    });
});


/**
 * Edits an existing experience entry in a users profile.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/experience?id=value&start=value&end=value&job=value&img=value&employer=value
 */
app.put(ENDPOINT + '/profiles/experience', (req, res) => {
    const experienceID = req.query.id;
    const startDate = req.query.start;
    const endDate = req.query.end;
    const jobTitle = req.query.job;
    const imageUrl = req.query.img;
    const employer = req.query.employer;
    const sql = `CALL edit_experience_entry(
        ${experienceID}, "${startDate}", "${endDate}", "${jobTitle}", "${imageUrl}", "${employer}"
        );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success editing experience");
        } else {
            res.send("No changes were made to experience");
        }
    });
});


/**
 * Adds a new award/certificate to a user's profile.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/awardsAndCertification?id=value&title=value&date=value&img=value
 */
app.post(ENDPOINT + '/profiles/awardsAndCertification', (req, res) => {
    const userID = req.query.id;
    const awardTitle = req.query.title;
    const dateReceived = req.query.date;
    const imageUrl = req.query.img;
    const sql = `CALL new_award_entry("${userID}", "${awardTitle}", "${dateReceived}", "${imageUrl}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success adding award/certificate");
        } else {
            res.send("Error adding award/certificate");
        }
    });
});


/**
 * Edits an award/certificate entry in a user's profile.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/awardsAndCertification?id=value&title=value&date=value&img=value
 */
app.put(ENDPOINT + '/profiles/awardsAndCertification', (req, res) => {
    const awardID = req.query.id;
    const awardTitle = req.query.title;
    const dateReceived = req.query.date;
    const imageUrl = req.query.img;
    const sql = `CALL edit_award_entry(${awardID}, "${awardTitle}", "${dateReceived}", "${imageUrl}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success editing award/certificate");
        } else {
            res.send("No changes were made to award/certificate");
        }
    });
});


/**
 * Changes a user's bio.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/bio?id=value&bio=value
 */
 app.put(ENDPOINT + '/profiles/bio', (req, res) => {
    const userID = req.query.id;
    const newBio = req.query.bio;
    const sql = `CALL change_bio("${userID}", "${newBio}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success editing bio");
        } else {
            res.send("No changes were made to bio");
        }
    });
});


/**
 * Changes a user's profile picture url.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/picture?id=value&picUrl=value
 */
 app.put(ENDPOINT + '/profiles/picture', (req, res) => {
    const userID = req.query.id;
    const newPic = req.query.picUrl;
    const sql = `CALL change_profile_pic("${userID}", "${newPic}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success editing profile pic");
        } else {
            res.send("No changes were made to profile pic");
        }
    });
});


/**
 * Gets all categories of volunteer work.
 */
 app.get(ENDPOINT + '/categories', (req, res) => {
    const sql = "SELECT * FROM volunteer_categories;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        let resultText = JSON.stringify(result);
        res.end(resultText);
    });
});


/*
TODO:
-Profile
DONEa) Add skills (PUT - new_skill_entry) TESTED
DONEb) Remove skills (DELETE - remove_skill_entry) TESTED
DONEc) Add education (POST - new_education_entry) TESTED
DONEd) Edit education (PUT - edit_education_entry) TESTED
DONEe) Add experience (POST - new_experience_entry) TESTED
DONEf) Edit experience (PUT - edit_experience_entry) TESTED
DONEg) Add award/certification (POST - new_award_entry) TESTED
DONEh) Edit award/certification (PUT - edit_award_entry) TESTED
DONEi) Edit profile pic (PUT - change_profile_pic) TESTED
DONEj) Edit bio (PUT - change_bio) TESTED
    k) Request to follow a user
    l) Accept a follow request
    m) Unfollow a user

-Bulletin Board
    a) View all opportunities (GET - _______)
    b) Post new opportunity (POST - _______)
    c) Apply to opportunity (PUT - _______)
    d) View applicants (GET - _______)
    e) View opportunites applied for (GET - _____)
    f) View all categories (GET - SELECT...)
    g) View recommended opportunitues (GET - ____)

-Social Posts
DONEa) View social feed (GET - posts_feed) TESTED
    b) View single social post (GET - _____)
    c) Like post (PUT - like_post)
    d) Unlike post (DELETE - unlike_post)
    e) Comment on a post (POST - _____)
    f) View all comments (GET - _____)
    g) View stories

-Messages
    a) View all messages for a conversation (GET - _____)
    b) Send message to another user (POST - _____)
    c) View all conversations for a user (GET - _____)

-Notifications
    a) View all notifications
*/


app.listen();