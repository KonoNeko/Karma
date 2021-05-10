/*
TODO:
-Profile
DONEa) Gather profile info (with education, skills, experience, etc.)
DONEb) Create a new profile/signup
DONEc) Edit a profile/add information
    d) Request to follow a user
    e) Accept a follow request
    f) Unfollow a user

-Messaging
    a) View all messages for a conversation
    b) Send a message to a user
    c) View all conversations of a user

-Bulletin Board
DONEa) See all opportunities (by category)
DONEb) Apply for an opportunity
DONEc) Post a new opportunity (+ selecting categories)
    d) View applicants for the posted opportunites
    e) Accept/hire applicants for an opportunity

-Social Posts
DONEa) View all posts (social feed)
    b) View comments
DONEc) Get caption, location and image??
DONEd) View number of likes
DONEe) View timestamp posted
DONEf) Like a post
    g) Comment on a post

-Notifications
    a) View all notifications
    b) Trigger for like notification
    c) Trigger for follow request notification
    d) Trigger for application acceptance
*/



/*
Gets all the user profile information (following stats, skills, education, experiences, awards, posts).
*/
DROP PROCEDURE IF EXISTS get_profile_info;
DELIMITER //
CREATE PROCEDURE get_profile_info(IN current_username VARCHAR(50))
BEGIN
    SELECT prof.*, edu.*, ex.*, sk.*, aw.*
    FROM profiles prof
    INNER JOIN profile_education pe
    ON prof.profile_id = pe.profile_id
    INNER JOIN education edu
    ON edu.education_id = pe.education_id

    INNER JOIN profile_experiences pex
    ON prof.profile_id = pex.profile_id
    INNER JOIN experiences ex
    ON ex.experience_id = pex.experience_id

    INNER JOIN profile_skills ps
    ON prof.profile_id = ps.profile_id
    INNER JOIN skills sk
    ON sk.skill_id = ps.skill_id

    INNER JOIN profile_awards pa
    ON prof.profile_id = pa.profile_id
    INNER JOIN awards_certifications aw
    ON aw.award_id = pa.award_id

    WHERE prof.username = current_username;
END//
DELIMITER ;


/*
Creates a new profile when a user signs up.
*/
DROP PROCEDURE IF EXISTS create_new_profile;
DELIMITER //
CREATE PROCEDURE create_new_profile(IN new_username VARCHAR(50), 
                                    IN new_fullname VARCHAR(100),
                                    IN new_is_volunteer TINYINT(1))
BEGIN
    INSERT INTO profiles(username, full_name, is_volunteer, profile_pic_url)
    VALUES (new_username, new_fullname, new_is_volunteer, "");
    CALL new_education_entry(new_username, "Start", "End", 0.0, "Certification type", "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png", "School Name");
    CALL new_experience_entry(new_username, "Start", "End", "Job title", "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png", "Employer");
    CALL new_award_entry(new_username, "Certificate Title", "Date Received", "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png");
    CALL new_skill_entry(new_username, "Community Member");
END//
DELIMITER ;


/*
Creates a new education entry with the associated username.

Example of the procedure being called:
CALL new_education_entry("username", "start", "end", "gpa", "certification type", "image url", "school name");
*/
DROP PROCEDURE IF EXISTS new_education_entry;
DELIMITER //
CREATE PROCEDURE new_education_entry(IN current_username VARCHAR(50),
IN new_start CHAR(50), IN new_end CHAR(50), IN new_gpa DECIMAL(2, 1),
IN new_type CHAR(50), IN new_image TEXT, IN new_name CHAR(50))
BEGIN
    INSERT INTO education(`school_name`, `edu_start_date`, `edu_end_date`,
    `gpa`, `certification_type`, `edu_image_url`)
    VALUES (new_name, new_start, new_end, new_gpa, new_type, new_image);
    INSERT INTO profile_education(profile_id, education_id)
    VALUES ((SELECT get_user_id(current_username)), (SELECT LAST_INSERT_ID()));
END//
DELIMITER ;


/*
Creates a new experience entry with the associated username.

Example of the procedure being called:
CALL new_experience_entry("username", "start", "end", "job title", "image url", "employer");
*/
DROP PROCEDURE IF EXISTS new_experience_entry;
DELIMITER //
CREATE PROCEDURE new_experience_entry(IN current_username VARCHAR(50),
IN new_start CHAR(50), IN new_end CHAR(50), IN new_title CHAR(50), 
IN new_image TEXT, IN new_employer CHAR(50))
BEGIN
    INSERT INTO experiences(`job_title`, `exp_start_date`, `exp_end_date`,
    `employer`, `exp_image_url`)
    VALUES (new_title, new_start, new_end, new_employer, new_image);
    INSERT INTO profile_experiences(profile_id, experience_id)
    VALUES ((SELECT get_user_id(current_username)), (SELECT LAST_INSERT_ID()));
END//
DELIMITER ;


/*
Creates a new award/certification entry with the associated username.

Example of the procedure being called:
CALL new_award_entry("username", "award title", "date received", "image url");
*/
DROP PROCEDURE IF EXISTS new_award_entry;
DELIMITER //
CREATE PROCEDURE new_award_entry(IN current_username VARCHAR(50),
IN new_title CHAR(50), IN new_date CHAR(50), IN new_img TEXT)
BEGIN
    INSERT INTO awards_certifications(`title`, `date_received`, `awards_image_url`)
    VALUES (new_title, new_date, new_img);
    INSERT INTO profile_awards(profile_id, award_id)
    VALUES ((SELECT get_user_id(current_username)), (SELECT LAST_INSERT_ID()));
END//
DELIMITER ;


/*
Connects a skill entry with the associated username.

Example of the procedure being called:
CALL new_skill_entry("username", "skill");
*/
DROP PROCEDURE IF EXISTS new_skill_entry;
DELIMITER //
CREATE PROCEDURE new_skill_entry(IN current_username CHAR(50),
IN new_title CHAR(50))
BEGIN
    INSERT IGNORE INTO skills (skill_title)
    VALUES (new_title);
    INSERT INTO profile_skills(profile_id, skill_id)
    VALUES ((SELECT get_user_id(current_username)), (SELECT skill_id FROM skills WHERE skill_title = new_title));
END//
DELIMITER ;


/*
Removes the connection between a skill entry and the associated username.

Example of the procedure being called:
CALL remove_skill_entry("username", "skill");
*/
DROP PROCEDURE IF EXISTS remove_skill_entry;
DELIMITER //
CREATE PROCEDURE remove_skill_entry(IN current_username CHAR(50),
IN current_skill CHAR(50))
BEGIN
    DELETE FROM profile_skills 
    WHERE profile_id = (SELECT get_user_id(current_username)) 
    AND skill_id = (
        SELECT skill_id FROM skills WHERE skill_title = current_skill
        );
END//
DELIMITER ;


/*
Makes changes to an education entry.

Example of the procedure being called:
CALL edit_education_entry("Education ID", "start", "end", "gpa", "certification type", "image url", "school name");
*/
DROP PROCEDURE IF EXISTS edit_education_entry;
DELIMITER //
CREATE PROCEDURE edit_education_entry(IN edu_id INTEGER,
IN new_start CHAR(50), IN new_end CHAR(50), IN new_gpa DECIMAL(2, 1),
IN new_type CHAR(50), IN new_image TEXT, IN new_name CHAR(50))
BEGIN
    UPDATE education
    SET 
    `school_name` = new_name,
    `edu_start_date` = new_start, 
    `edu_end_date` = new_end,
    `gpa` = new_gpa, 
    `certification_type` = new_type, 
    `edu_image_url` = new_image
    WHERE education_id = edu_id;
END//
DELIMITER ;

/*
Makes changes to an experience entry.

Example of the procedure being called:
CALL edit_experience_entry("Experience ID", "start", "end", "job title", "image url", "employer");
*/
DROP PROCEDURE IF EXISTS edit_experience_entry;
DELIMITER //
CREATE PROCEDURE edit_experience_entry(IN exp_id INTEGER,
IN new_start CHAR(50), IN new_end CHAR(50), IN new_title CHAR(50), 
IN new_image TEXT, IN new_employer CHAR(50))
BEGIN
    UPDATE experiences
    SET 
    `job_title` = new_title,
    `exp_start_date` = new_start,
    `exp_end_date` = new_end,
    `employer` = new_employer,
    `exp_image_url` = new_image
    WHERE experience_id = exp_id;
END//
DELIMITER ;


/*
Makes changes to an existing award/certificate entry.

Example of the procedure being called:
CALL new_award_entry("Award ID", "award title", "date received", "image url");
*/
DROP PROCEDURE IF EXISTS edit_award_entry;
DELIMITER //
CREATE PROCEDURE edit_award_entry(IN awrd_id INTEGER,
IN new_title CHAR(50), IN new_date CHAR(50), IN new_img TEXT)
BEGIN
    UPDATE awards_certifications
    SET
    `title` = new_title,
    `date_received` = new_date, 
    `awards_image_url` = new_img
    WHERE award_id = awrd_id;
END//
DELIMITER ;

/*
Changes the current profile picture of a user.

Example of the procedure being called:
CALL change_profile_pic("user id", "image url");
*/
DROP PROCEDURE IF EXISTS change_profile_pic;
DELIMITER //
CREATE PROCEDURE change_profile_pic(IN current_username CHAR(50), IN new_img TEXT)
BEGIN
    UPDATE profiles
    SET profile_pic_url = new_img
    WHERE username = current_username;
END//
DELIMITER ;


/*
Changes the current bio of a user.

Example of the procedure being called:
CALL change_bio("user id", "bio");
*/
DROP PROCEDURE IF EXISTS change_bio;
DELIMITER //
CREATE PROCEDURE change_bio(IN current_username CHAR(50), IN new_bio TEXT)
BEGIN
    UPDATE profiles
    SET bio = new_bio
    WHERE username = current_username;
END//
DELIMITER ;


/*
Gathers all the posts to fill a social feed
*/
CREATE VIEW posts_feed as
SELECT s.image_url, s.caption, s.location, s.post_date, 
s.likes, p.username, p.profile_pic_url, s.user_id, s.post_id
FROM social_posts s JOIN profiles p
ON s.user_id = p.profile_id
ORDER BY s.post_date


/*
Gathers all the posts on the bulletin board.
*/
CREATE VIEW bulletin_board as
SELECT *
FROM opportunites
ORDER BY post_date


/*
Applies for an opportunity.
*/
DROP PROCEDURE IF EXISTS apply_for_opportunity;
DELIMITER //
CREATE PROCEDURE apply_for_opportunity(IN current_user_id CHAR(50), IN posting_id INTEGER, IN new_message TEXT)
BEGIN
    INSERT INTO opportunites_applicants(`applicant_username`, `opportunity_id`,`message`)
    VALUES (current_user_id, posting_id, new_message);
END//
DELIMITER ;


/*
Creates a new opportunity.

Test call:
CALL new_opportunity("Karma", "Environment", "2021-05-30", "Clean Up Crew Member", 
"Clean up the Fraser river. All clothing and equipment provided", "No requirements",
"https://coconuts.co/wp-content/uploads/2018/03/dirty-river.jpg");
*/
DROP PROCEDURE IF EXISTS new_opportunity;
DELIMITER //
CREATE PROCEDURE new_opportunity(IN current_user_id CHAR(50), IN new_category CHAR(50), IN new_date DATE, 
IN new_title CHAR(50), IN new_desc TEXT, IN new_req TEXT, IN new_img TEXT)
BEGIN
    INSERT INTO opportunites(`employer`, `category`, `event_date`, 
    `poster_id`, `title`, `description`, `requirements`, `image_url`)
    VALUES (get_full_name(current_user_id), new_category, new_date, 
    get_user_id(current_user_id), new_title, new_desc, new_req, new_img);
END//
DELIMITER ;


/*
Gets the user id using a username.
*/
DROP FUNCTION IF EXISTS get_user_id;
DELIMITER //
CREATE FUNCTION get_user_id(current_username CHAR(50)) 
RETURNS CHAR(50) READS SQL DATA
BEGIN
    RETURN (
      SELECT profile_id
      FROM profiles
      WHERE username = current_username
    );
END //
DELIMITER ;


/*
Gets the fullname using a username.
*/
DROP FUNCTION IF EXISTS get_full_name;
DELIMITER //
CREATE FUNCTION get_full_name(current_username CHAR(50)) 
RETURNS CHAR(50) READS SQL DATA
BEGIN
    RETURN (
      SELECT full_name
      FROM profiles
      WHERE username = current_username
    );
END //
DELIMITER ;


/*
Gets all the user profile information (following stats, skills, education, experiences, awards, posts).
*/
DROP PROCEDURE IF EXISTS create_post;
DELIMITER //
CREATE PROCEDURE create_post(IN current_username VARCHAR(50), IN media_url TEXT, IN new_caption TEXT, IN new_location CHAR(50))
BEGIN
    INSERT INTO social_posts(`user_id`, `image_url`, `caption`, `location`)
    VALUES (get_user_id(current_username), media_url, new_caption, new_location);
END//
DELIMITER ;


/*
Increments the number of posts that a profile has.
*/
DROP PROCEDURE IF EXISTS increment_post_number;
DELIMITER //
CREATE PROCEDURE increment_post_number (IN current_poster INTEGER)
BEGIN
    UPDATE profiles
    SET posts = posts + 1
    WHERE profile_id = current_poster;
END//
DELIMITER ;


/*
Decrements the number of likes that a post has.
*/
DROP PROCEDURE IF EXISTS decrement_post_number;
DELIMITER //
CREATE PROCEDURE decrement_post_number (IN current_poster INTEGER)
BEGIN
    UPDATE profiles
    SET posts = posts - 1
    WHERE profile_id = current_poster;
END//
DELIMITER ;


/*
Automatically updates the number of posts a user has after creation
*/
CREATE trigger update_post_number
    AFTER INSERT ON social_posts
    FOR EACH ROW
    CALL increment_post_number(NEW.user_id);


/*
Automatically updates the number of posts a user has after deletion
*/
CREATE trigger update_post_number_del
    AFTER DELETE ON social_posts
    FOR EACH ROW
    CALL decrement_post_number(OLD.user_id);


/*
Disconnects a deleted education entry from the original user.
*/
CREATE trigger disconnect_education
    AFTER DELETE ON education
    FOR EACH ROW
    DELETE FROM profile_education WHERE education_id = OLD.education_id;


/*
Disconnects a deleted experience entry from the original user.
*/
CREATE trigger disconnect_experience
    AFTER DELETE ON experiences
    FOR EACH ROW
    DELETE FROM profile_experiences WHERE experience_id = OLD.experience_id;


/*
Disconnects a deleted award/certificate entry from the original user.
*/
CREATE trigger disconnect_award
    AFTER DELETE ON awards_certifications
    FOR EACH ROW
    DELETE FROM profile_awards WHERE award_id = OLD.award_id;


/*
Likes a social post.
*/
DROP PROCEDURE IF EXISTS like_post;
DELIMITER //
CREATE PROCEDURE like_post(IN current_post INTEGER, IN liker_id INTEGER)
BEGIN
    INSERT INTO post_likes (post_id, user_id)
    VALUES (current_post, liker_id);
END//
DELIMITER ;


/*
Increments the number of likes that a post has.
*/
DROP PROCEDURE IF EXISTS increment_post_likes;
DELIMITER //
CREATE PROCEDURE increment_post_likes (IN current_post_id INT)
BEGIN
    UPDATE social_posts
    SET likes = likes + 1
    WHERE post_id = current_post_id;
END//
DELIMITER ;


/*
Unlikes a social post.
*/
DROP PROCEDURE IF EXISTS unlike_post;
DELIMITER //
CREATE PROCEDURE unlike_post(IN current_post INTEGER, IN liker_id INTEGER)
BEGIN
    DELETE FROM post_likes
    WHERE post_id = current_post AND user_id = liker_id;
END//
DELIMITER ;


/*
Decrements the number of likes a post has.
*/
DROP PROCEDURE IF EXISTS decrement_post_likes;
DELIMITER //
CREATE PROCEDURE decrement_post_likes (IN current_post_id INT)
BEGIN
    UPDATE social_posts
    SET likes = likes - 1
    WHERE post_id = current_post_id;
END//
DELIMITER ;


/*
Automatically updates the value of likes a post has after a user likes a post.
*/
CREATE trigger update_post_like_likes
    AFTER INSERT ON post_likes
    FOR EACH ROW
    CALL increment_post_likes(NEW.post_id);


/*
Automatically updates the value of unlikes a post has after a user likes a post.
*/
CREATE trigger update_post_like_unlikes
    AFTER DELETE ON post_likes
    FOR EACH ROW
    CALL decrement_post_likes(OLD.post_id);