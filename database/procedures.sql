/*
TODO:
-Profile
DONEa) Gather profile info (with education, skills, experience, etc.) - get_profile_info
DONEb) Create a new profile/signup - create_new_profile
DONEc) Edit a profile/add information - new___entry or edit____entry
DONEd) Request to follow a user - request_to_follow_user
DONEe) Accept a follow request - accept_a_follow_request
DONEf) Unfollow a user - unfollow_user

-Messaging
DONEa) View all messages for a conversation
DONEb) Send a message to a user - 
DONEc) View all conversations of a user

-Bulletin Board
DONEa) See all opportunities (by category) - bulletin_board
DONEb) Apply for an opportunity - apply_for_opportunity
DONEc) Post a new opportunity - new_opportunity
DONEd) View applicants for the posted opportunites - view_applicants
DONEe) Accept/hire applicants for an opportunity - accept_application
DONEf) View opportunities a user applied for - view_user_applications

-Social Posts
DONEa) View all posts (social feed) - posts_feed
DONEb) View comments - view_comments
DONEc) Get caption, location and image - posts_feed
DONEd) View number of likes - posts_feed
DONEe) View timestamp posted - posts_feed
DONEf) Like a post - like_post
DONEg) Comment on a post - comment_on_post
    h) View all stories
    i) Post a story
    j) View all stories for 1 user
    k) View a single story
    l) Delete a story aftert 24hours

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
Gets all the conversations from 
*/
DROP PROCEDURE IF EXISTS view_conversations;
DELIMITER //
CREATE PROCEDURE view_conversations(IN current_username CHAR(50))
BEGIN
    SELECT DISTINCT con.conversation_id, 
    get_other_user(con.conversation_id, current_username) as other_user,
    get_latest_message(con.conversation_id) as latest_message,
    get_latest_message_timestamp(con.conversation_id) as latest_message_timestamp
    FROM conversations con JOIN messages m
    WHERE con.user_id_1 = get_user_id(current_username)
    OR con.user_id_2 = get_user_id(current_username);
END//
DELIMITER ;


/*
Gets all the messages in a conversation.
*/
DROP PROCEDURE IF EXISTS view_a_conversation;
DELIMITER //
CREATE PROCEDURE view_a_conversation(IN current_conversation INTEGER, IN current_username CHAR(50))
BEGIN
    SELECT message_id, get_user_name(sender_id) as sender, `message`, `timestamp`,
    get_other_user(current_conversation, current_username) as other_user
    FROM messages
    WHERE conversation_id = current_conversation
    ORDER BY message_id;
END//
DELIMITER ;


/*
Returns the full name of the opposite user of a user's conversation.
*/
DROP FUNCTION IF EXISTS get_other_user;
DELIMITER //
CREATE FUNCTION get_other_user(current_conversation INTEGER, current_username CHAR(50)) 
RETURNS CHAR(100) READS SQL DATA
BEGIN
    IF (SELECT true FROM conversations where conversation_id = current_conversation AND user_id_1 = get_user_id(current_username)) THEN
        RETURN (
            SELECT get_full_name_with_id(user_id_2) FROM conversations WHERE conversation_id = current_conversation AND user_id_1 = get_user_id(current_username)
        );
    ELSEIF (SELECT true FROM conversations where conversation_id = current_conversation AND user_id_2 = get_user_id(current_username)) THEN
        RETURN (
            SELECT get_full_name_with_id(user_id_1) FROM conversations WHERE conversation_id = current_conversation AND user_id_2 = get_user_id(current_username)
        );
    END IF;
END //
DELIMITER ;


/*
Returns the latest message of a given conversation.
*/
DROP FUNCTION IF EXISTS get_latest_message;
DELIMITER //
CREATE FUNCTION get_latest_message(current_conversation INTEGER) 
RETURNS TEXT READS SQL DATA
BEGIN
    RETURN(
        SELECT `message` FROM messages 
        WHERE message_id = (
            SELECT max(message_id) FROM messages
            WHERE conversation_id = current_conversation
        )
    );
END //
DELIMITER ;


/*
Returns the timestamp of the latest message of a given conversation. 
*/
DROP FUNCTION IF EXISTS get_latest_message_timestamp;
DELIMITER //
CREATE FUNCTION get_latest_message_timestamp(current_conversation INTEGER) 
RETURNS TEXT READS SQL DATA
BEGIN
    RETURN(
        SELECT `timestamp` FROM messages 
        WHERE message_id = (
            SELECT max(message_id) FROM messages
            WHERE conversation_id = current_conversation
        )
    );
END //
DELIMITER ;


/*
Sends a message to another user.
*/
DROP PROCEDURE IF EXISTS send_message;
DELIMITER //
CREATE PROCEDURE send_message(IN sender_id CHAR(50), IN receiver_id CHAR(50), 
IN new_msg TEXT)
BEGIN
    IF (SELECT (SELECT get_conversation_id(sender_id, receiver_id) IS NULL)) THEN
        INSERT INTO conversations (`user_id_1`, `user_id_2`)
        VALUES (get_user_id(sender_id), get_user_id(receiver_id));
    END IF;
    INSERT INTO messages(`sender_id`, `receiver_id`, `conversation_id`, `message`)
    VALUES (get_user_id(sender_id), get_user_id(receiver_id), 
    get_conversation_id(sender_id, receiver_id), new_msg);
END//
DELIMITER ;


/*
Returns the conversation id between two user (if it exists).
*/
DROP FUNCTION IF EXISTS get_conversation_id;
DELIMITER //
CREATE FUNCTION get_conversation_id(user_1 CHAR(50), user_2 CHAR(50)) 
RETURNS INTEGER READS SQL DATA
BEGIN
    RETURN (
      SELECT conversation_id
      FROM conversations
      WHERE (user_id_1 = get_user_id(user_1) AND user_id_2 = get_user_id(user_2))
      OR (user_id_1 = get_user_id(user_2) AND user_id_2 = get_user_id(user_1))
    );
END //
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

Test call:
CALL apply_for_opportunity("marlon", 5, "Hire me 2", "marlonrfajardo@gmail.com", "7782313497", "Langley, British Columbia");
*/
DROP PROCEDURE IF EXISTS apply_for_opportunity;
DELIMITER //
CREATE PROCEDURE apply_for_opportunity(IN current_user_id CHAR(50), IN posting_id INTEGER, IN new_message TEXT,
IN new_email CHAR(100), IN new_phone CHAR(10), IN new_city CHAR(100))
BEGIN
    INSERT INTO opportunites_applicants(`applicant_username`, `opportunity_id`, `message`,
    `email`, `phone_num`, `city`)
    VALUES (current_user_id, posting_id, new_message, new_email, new_phone, new_city);
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
Gets all the applicants for an opportunity.
*/
DROP PROCEDURE IF EXISTS view_applicants;
DELIMITER //
CREATE PROCEDURE view_applicants(IN current_opportunity_id INTEGER)
BEGIN
    SELECT * FROM opportunites_applicants
    WHERE opportunity_id = current_opportunity_id;
END//
DELIMITER ;

/*
Marks an application as 'accepted'.
*/
DROP PROCEDURE IF EXISTS accept_application;
DELIMITER //
CREATE PROCEDURE accept_application(IN current_opportunity_id INTEGER, 
IN applicant_name CHAR(50))
BEGIN
    UPDATE opportunites_applicants
    SET accepted = 1
    WHERE opportunity_id = current_opportunity_id
    AND applicant_username = applicant_name;
END//
DELIMITER ;


/*
View opportunites that a user applied for.
*/
DROP PROCEDURE IF EXISTS view_user_applications;
DELIMITER //
CREATE PROCEDURE view_user_applications(IN current_username CHAR(50))
BEGIN
    SELECT * 
    FROM opportunites JOIN opportunites_applicants 
    ON opportunites.opportunity_id = opportunites_applicants.opportunity_id
    WHERE opportunites_applicants.applicant_username = current_username;
END//
DELIMITER ;


/*
Creates a request to follow a user.

CALL request_to_follow_user("The user following", "The user being followed");
CALL accept_a_follow_request("The user following", "The user being followed");
CALL accept_a_follow_request("Marlon", "karma");
*/
DROP PROCEDURE IF EXISTS request_to_follow_user;
DELIMITER //
CREATE PROCEDURE request_to_follow_user(IN user_following CHAR(50), 
IN user_being_followed CHAR(50))
BEGIN
    INSERT INTO profile_follows (profile_id, follower_id)
    VALUES (get_user_id(user_being_followed), get_user_id(user_following));
END//
DELIMITER ;

/*
Updates a request to an accepted state.
*/
DROP PROCEDURE IF EXISTS accept_a_follow_request;
DELIMITER //
CREATE PROCEDURE accept_a_follow_request(IN user_following CHAR(50), 
IN user_being_followed CHAR(50))
BEGIN
    UPDATE profile_follows
    SET request_accepted = 1
    WHERE profile_id = get_user_id(user_being_followed)
    AND follower_id = get_user_id(user_following);
END//
DELIMITER ;


/*
Unfollows a user and deletes a follow entry.
*/
DROP PROCEDURE IF EXISTS unfollow_user;
DELIMITER //
CREATE PROCEDURE unfollow_user(IN user_following CHAR(50), 
IN user_being_followed CHAR(50))
BEGIN
    DELETE FROM profile_follows
    WHERE profile_id = get_user_id(user_being_followed)
    AND follower_id = get_user_id(user_following);
END//
DELIMITER ;


/*
Increments the number of posts that a profile has.
*/
DROP PROCEDURE IF EXISTS increment_followers;
DELIMITER //
CREATE PROCEDURE increment_followers (IN current_username INTEGER)
BEGIN
    UPDATE profiles
    SET followers = followers + 1
    WHERE profile_id = current_username;
END//
DELIMITER ;


/*
Increments the number of posts that a profile has.
*/
DROP PROCEDURE IF EXISTS decrement_followers;
DELIMITER //
CREATE PROCEDURE decrement_followers (IN current_username INTEGER)
BEGIN
    UPDATE profiles
    SET followers = followers - 1
    WHERE profile_id = current_username;
END//
DELIMITER ;


/*
Automatically updates the value of followers a user has.
*/
DROP TRIGGER IF EXISTS update_follower_number;
DELIMITER //
CREATE trigger update_follower_number
    AFTER UPDATE ON profile_follows
    FOR EACH ROW
    BEGIN
        IF OLD.request_accepted <> new.request_accepted THEN
            CALL increment_followers(NEW.profile_id);
        END IF;
    END//
DELIMITER ;


/*
Automatically updates the value of followers a user has.
*/
CREATE trigger update_follower_number_unfollow
    AFTER DELETE ON profile_follows
    FOR EACH ROW
    CALL decrement_followers(OLD.profile_id);


/*
Gets the user id using a username.
*/
DROP FUNCTION IF EXISTS get_user_id;
DELIMITER //
CREATE FUNCTION get_user_id(current_username CHAR(50)) 
RETURNS INTEGER READS SQL DATA
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
Gets the fullname using an id.
*/
DROP FUNCTION IF EXISTS get_full_name_with_id;
DELIMITER //
CREATE FUNCTION get_full_name_with_id(current_user_id INTEGER) 
RETURNS CHAR(50) READS SQL DATA
BEGIN
    RETURN (
      SELECT full_name
      FROM profiles
      WHERE profile_id = current_user_id
    );
END //
DELIMITER ;

/*
Gets the username using an id.
*/
DROP FUNCTION IF EXISTS get_user_name;
DELIMITER //
CREATE FUNCTION get_user_name(current_user_id INTEGER) 
RETURNS CHAR(50) READS SQL DATA
BEGIN
    RETURN (
      SELECT username
      FROM profiles
      WHERE profile_id = current_user_id
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
Gets all the comments for a social post.
*/
DROP PROCEDURE IF EXISTS view_comments;
DELIMITER //
CREATE PROCEDURE view_comments(IN current_post INTEGER)
BEGIN
    SELECT * FROM post_comments
    WHERE post_id = current_post
    ORDER BY post_date;
END//
DELIMITER ;


/*
Comment on a social post.
*/
DROP PROCEDURE IF EXISTS comment_on_post;
DELIMITER //
CREATE PROCEDURE comment_on_post(IN current_post INTEGER, IN commenter_id CHAR(50),
IN new_msg TEXT)
BEGIN
    INSERT INTO post_comments (post_id, user_id, comment)
    VALUES (current_post, get_user_id(commenter_id), new_msg);
END//
DELIMITER ;


/*
Replies to a comment on a social post.
*/
DROP PROCEDURE IF EXISTS reply_to_comment;
DELIMITER //
CREATE PROCEDURE reply_to_comment(IN current_post INTEGER, IN commenter_id CHAR(50),
IN new_msg TEXT, IN comment_id INTEGER)
BEGIN
    INSERT INTO post_comments (post_id, user_id, comment, is_a_reply, id_of_comment_receiving_reply)
    VALUES (current_post, get_user_id(commenter_id), new_msg, 1, comment_id);
END//
DELIMITER ;


/*
Removes a comment from a social post.
*/
DROP PROCEDURE IF EXISTS delete_comment;
DELIMITER //
CREATE PROCEDURE delete_comment(IN del_comment_id INTEGER)
BEGIN
    DELETE FROM post_comments
    WHERE comment_id = del_comment_id;
END//
DELIMITER ;


/*
Increments the number of likes that a post has.
*/
DROP PROCEDURE IF EXISTS increment_post_comments;
DELIMITER //
CREATE PROCEDURE increment_post_comments (IN current_post_id INT)
BEGIN
    UPDATE social_posts
    SET comments = comments + 1
    WHERE post_id = current_post_id;
END//
DELIMITER ;


/*
Automatically updates the number of comments a post has.
*/
CREATE trigger update_comment_number
    AFTER INSERT ON post_comments
    FOR EACH ROW
    CALL increment_post_comments(NEW.post_id);


/*
Decrements the number of comments that a post has.
*/
DROP PROCEDURE IF EXISTS decrement_post_comments;
DELIMITER //
CREATE PROCEDURE decrement_post_comments (IN current_post_id INT)
BEGIN
    UPDATE social_posts
    SET comments = comments - 1
    WHERE post_id = current_post_id;
END//
DELIMITER ;


/*
Automatically updates the number of comments a post has.
*/
CREATE trigger update_comment_number_delete
    AFTER DELETE ON post_comments
    FOR EACH ROW
    CALL decrement_post_comments(OLD.post_id);


/*
Likes a social post.
*/
DROP PROCEDURE IF EXISTS like_post;
DELIMITER //
CREATE PROCEDURE like_post(IN current_post INTEGER, IN liker_id CHAR(50))
BEGIN
    INSERT INTO post_likes (post_id, user_id)
    VALUES (current_post, get_user_id(liker_id));
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