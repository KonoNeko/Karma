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
 * Gets all posts for a user's social feed in order of date posted.
 */
app.get(ENDPOINT + '/posts/:userID', (req, res) => {
    const id = req.params.userID;
    const sql = `CALL user_posts_feed('${id}');`;
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
 * Gets the list of profiles
 */
 app.get(ENDPOINT + '/profiles', (req, res) => {
    const id = req.params.userID;
    const sql = `SELECT profile_id, full_name, username, profile_pic_url FROM profiles;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
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
 * Creates a new follow request.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/followers?id=value&follower=value
 */
 app.post(ENDPOINT + '/profiles/followers', (req, res) => {
    const userFollowing = req.query.follower;
    const userBeingFollowed = req.query.id;
    const sql = `CALL request_to_follow_user("${userFollowing}", "${userBeingFollowed}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success requesting to follow user");
        } else {
            res.send("Error requesting to follow user");
        }
    });
});


/**
 * Accepts an existing follow request.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/followers?id=value&follower=value
 */
 app.put(ENDPOINT + '/profiles/followers', (req, res) => {
    const userFollowing = req.query.follower;
    const userBeingFollowed = req.query.id;
    const sql = `CALL accept_a_follow_request("${userFollowing}", "${userBeingFollowed}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success accepting follow request");
        } else {
            res.send("Error accepting follow request");
        }
    });
});


/**
 * Deletes a follow entry.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/followers?id=value&follower=value
 */
 app.delete(ENDPOINT + '/profiles/followers', (req, res) => {
    const userFollowing = req.query.follower;
    const userBeingFollowed = req.query.id;
    const sql = `CALL unfollow_user("${userFollowing}", "${userBeingFollowed}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success unfollowing user");
        } else {
            res.send("Error unfollowing user");
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
 * Gets all followers for a user.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profiles/followers?id=value
 */
 app.get(ENDPOINT + '/profiles/followers/:id', (req, res) => {
    const userID = req.params.id;
    const sql = `CALL get_followers('${userID}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result[0]));
    });
});


/**
 * Gets all the profiles that a user is following.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profile/following?id=value
 */
 app.get(ENDPOINT + '/profiles/following', (req, res) => {
    const userID = req.query.id;
    const sql = `CALL get_following('${userID}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result[0]));
    });
});


/**
 * Gets all categories of volunteer work.
 */
app.get(ENDPOINT + '/categories', (req, res) => {
    const sql = "SELECT * FROM volunteer_categories;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        let filteredResults = [];
        for (let i=0; i<result.length; i++) {
            filteredResults[i] = result[i].category;
        }
        res.end(JSON.stringify(filteredResults));
    });
});


/**
 * Gets a single social post.
 */
app.get(ENDPOINT + '/post', (req, res) => {
    const userID = req.query.id;
    const postID = req.query.post;
    const sql = `CALL view_post(${postID}, "${userID}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});


/**
 * Likes a post with a given userid and post id
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/post/like?id=value&post=value
 */
app.post(ENDPOINT + '/post/like', (req, res) => {
    const userID = req.query.id;
    const postID = req.query.post;
    const sql = `CALL like_post(${postID}, "${userID}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success liking post");
        } else {
            res.send("Error liking post");
        }
    });
});


/**
 * Unlikes a post with a given userid and post id
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/post/like?id=value&post=value
 */
app.delete(ENDPOINT + '/post/like', (req, res) => {
    const userID = req.query.id;
    const postID = req.query.post;
    const sql = `CALL unlike_post(${postID}, "${userID}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success unliking post");
        } else {
            res.send("Error unliking post");
        }
    });
});


/**
 * Comments a post with a given userid, post id and message.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/post/like?id=value&post=value&msg=value
 */
app.post(ENDPOINT + '/post/comment', (req, res) => {
    const userID = req.query.id;
    const postID = req.query.post;
    const message = req.query.msg;
    const sql = `CALL comment_on_post(${postID}, "${userID}", "${message}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success commenting on post");
        } else {
            res.send("Error commenting post");
        }
    });
});


/**
 * Deletes a comment on a post with a given comment id.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/post/like?id=value
 */
 app.delete(ENDPOINT + '/post/comment', (req, res) => {
    const commentID = req.query.id;
    const sql = `CALL delete_comment(${commentID});`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success deleting comment on post");
        } else {
            res.send("Error deleting comment post");
        }
    });
});


/**
 * Gets a single social post's comment.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/post/like?post=value
 */
 app.get(ENDPOINT + '/post/comments', (req, res) => {
    const postID = req.query.post;
    const sql = `CALL view_comments(${postID});`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        let comments = filter.comments(result[0]);
        res.end(JSON.stringify(comments));
    });
});


/**
 * Gets all opportunites posted sorted by category.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/post/like
 */
 app.get(ENDPOINT + '/opportunities', (req, res) => {
    const sql = `SELECT * FROM bulletin_board;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        let sortedOpportunities = filter.opportunities(result[0]);
        res.end(JSON.stringify(sortedOpportunities));
    });
});

/**
 * Creates a new volunteer opportunity.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/opportunities?id=value&category=value&date=value&title=value&desc=value&requires=value&img=value
 */
 app.post(ENDPOINT + '/opportunities', (req, res) => {
    const userID = req.query.id;
    const category = req.query.category;
    const date = req.query.date;
    const title = req.query.title;
    const desc = req.query.desc;
    const requires = req.query.requires;
    const img = req.query.img;
    const sql = `CALL new_opportunity("${userID}", "${category}", "${date}", 
    "${title}", "${desc}", "${requires}", "${img}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success creating new opportunity");
        } else {
            res.send("Error creating new opportunity");
        }
    });
});


/**
 * Gets all applicants for an opportunity.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1//opportunities/applicants?id=value
 */
 app.get(ENDPOINT + '/opportunities/applicants', (req, res) => {
    const opportunityID = req.query.id;
    const sql = `CALL view_applicants(${opportunityID});`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result[0]));
    });
});


/**
 * Gets all applicants for an opportunity.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1//opportunities/applications?id=value
 */
 app.get(ENDPOINT + '/opportunities/applications', (req, res) => {
    const userID = req.query.id;
    const sql = `CALL view_user_applications('${userID}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result[0]));
    });
});


/**
 * Creates a new volunteer opportunity application.
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/opportunities/applications?id=value&post=value&msg=value&email=value&phone=value&city=value
 */
 app.post(ENDPOINT + '/opportunities/applications', (req, res) => {
    const userID = req.query.id;
    const postingID = req.query.post;
    const msg = req.query.msg;
    const email = req.query.email;
    const phone = req.query.phone;
    const city = req.query.city;
    const sql = `CALL apply_for_opportunity("${userID}", ${postingID}, "${msg}", "${email}", "${phone}", "${city}");`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send("Success creating new application");
        } else {
            res.send("Error creating new application");
        }
    });
});


/**
 * Gets all conversations for a user
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profile/following?id=value
 */
 app.get(ENDPOINT + '/messages', (req, res) => {
    const userID = req.params.id;
    const sql = `CALL view_conversations('${userID}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result[0]));
    });
});


/**
 * Gets all conversations for a user
 * 
 * Example URL of the request (replace 'value' with an actual value):
 * https://marlonfajardo.ca/karma/v1/profile/following
 */
 app.get(ENDPOINT + '/messages/:id/:conversation', (req, res) => {
    const userID = req.params.id;
    const conversation = req.params.conversation;
    const sql = `CALL view_a_conversation(${conversation}, '${userID}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result[0]));
    });
});


/*
TODO:
-Profile
DONEa) Add skills (PUT - new_skill_entry)                           TESTED
DONEb) Remove skills (DELETE - remove_skill_entry)                  TESTED
DONEc) Add education (POST - new_education_entry)                   TESTED
DONEd) Edit education (PUT - edit_education_entry)                  TESTED
DONEe) Add experience (POST - new_experience_entry)                 TESTED
DONEf) Edit experience (PUT - edit_experience_entry)                TESTED
DONEg) Add award/certification (POST - new_award_entry)             TESTED
DONEh) Edit award/certification (PUT - edit_award_entry)            TESTED
DONEi) Edit profile pic (PUT - change_profile_pic)                  TESTED
DONEj) Edit bio (PUT - change_bio)                                  TESTED
DONEk) Request to follow a user (POST - request_to_follow_user)     TESTED
DONEl) Accept a follow request (PUT - accept_a_follow_request)      TESTED
DONEm) Unfollow a user (DELETE - unfollow_user)                     TESTED
DONEn) Get followers (GET - get_followers)                          TESTED
DONEo) Get following (GET - get_following)                          TESTED
DONEp) Get all profiles (GET - SELECT...)                           TESTED

-Bulletin Board
DONEa) View all opportunities (GET - bulletin_board)                TESTED
DONEb) Post new opportunity (POST - new_opportunity)                TESTED
DONEc) Apply to opportunity (POST - apply_for_opportunity)          TESTED
DONEd) View applicants (GET - view_applicants)                      TESTED
DONEe) View opportunites applied for (GET - view_user_applications) TESTED
DONEf) View all categories (GET - SELECT...)                        TESTED
    g) View recommended opportunitues (GET - ____)

-Social Posts
DONEa) View site-wide social feed (GET - posts_feed)                TESTED
DONEb) View single social post (GET - view_post)                    TESTED
DONEc) Like post (PUT - like_post)                                  TESTED
DONEd) Unlike post (DELETE - unlike_post)                           TESTED
DONEe) Comment on a post (POST - comment_on_post)                   TESTED
DONEf) View all comments (GET - view_comments)                      TESTED
    g) View stories -  **TODO**
DONEh) View social feed for a user (GET - user_posts_feed)          TESTED
DONEi) Delete comment - (DELETE - delete_comment)                   TESTED

-Messages
DONEa) View messages in conversation (GET - view_a_conversations)   TESTED
    b) Send message to another user (POST - send_message)
DONEc) View all conversations for a user (GET - view_conversations) TESTED

-Notifications
    a) View all notifications
*/


app.listen();