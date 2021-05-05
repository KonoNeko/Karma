/*
TODO:
-Profile
DONEa) Gather profile info (with education, skills, experience, etc.)
    b) Create a new profile/signup
    c) Sign a user in
    d) Edit a profile/add information

-Messaging
    a) View all messages
    b) Send a message to a user

-Bulletin Board
    a) See all opportunities (by category)
    b) Apply for an opportunity
    c) Post a new opportunity (+ selecting categories)
    d) View applicants for the posted opportunites

-Social Posts
DONEa) View all posts (social feed)
    b) View comments
DONEc) Get caption, location and image??
DONEd) View number of likes
DONEe) View timestamp posted
DONEf) Like a post
    g) Comment on a post
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
    INSERT INTO profiles(username, full_name, is_volunteer)
    VALUES (new_username, new_fullname, new_is_volunteer);
    -- Continue this .....
    -- CALL new_education_entry();
    -- CALL new_experience_entry();
    -- CALL new_award_entry();
    -- CALL new_skill_entry();
END//
DELIMITER ;


/*
Creates a new education entry with the associated username.

Example of the procedure being called:
CALL new_experience_entry("username", "start", "end", "gpa", "certification type", "image url", "school name");
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
    INSERT INTO experiences(`title`, `date_received`, `awards_image_url`)
    VALUES (new_title, new_date, new_image);
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
Gathers all the posts to fill a social feed
*/
CREATE VIEW posts_feed as
SELECT s.image_url, s.caption, s.location, s.post_date, 
s.likes, p.username, p.profile_pic_url, s.user_id, s.post_id
FROM social_posts s JOIN profiles p
ON s.user_id = p.profile_id
ORDER BY s.post_date


/*
Gets the user id using a username.
*/
DROP FUNCTION IF EXISTS get_user_id;
DELIMITER //
CREATE FUNCTION get_user_id(current_username VARCHAR(30)) 
RETURNS INT READS SQL DATA
BEGIN
    RETURN (
      SELECT profile_id
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