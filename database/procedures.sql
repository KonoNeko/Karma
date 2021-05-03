/*
TODO:
-Profile
    a) Gather profile info (with education, skills, experience, etc.)
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
    a) View comments
    b) Get caption, location and image??
    b) View number of likes
    c) View timestamp posted
    d) Like a post
    e) Comment on a post
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