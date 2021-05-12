/* This file holds the structure and table definitions of the Karma Database */

CREATE TABLE profiles (
    `profile_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `username` CHAR(50) NOT NULL,
    `full_name` CHAR(100) NOT NULL,
    `bio` TEXT DEFAULT "",
    `posts` INTEGER DEFAULT 0,
    `followers` INTEGER DEFAULT 0,
    `following` INTEGER DEFAULT 0,
    `profile_pic_url` TEXT NOT NULL,
    `is_volunteer` TINYINT(1) NOT NULL
);

CREATE TABLE profile_follows (
    `follow_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `follower_id` INTEGER NOT NULL,
    `request_accepted` TINYINT(1) DEFAULT 0,
    `timestamp` timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`profile_id`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`follower_id`) REFERENCES profiles (`profile_id`)
);

CREATE TABLE skills (
    `skill_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `skill_title` CHAR(50) UNIQUE NOT NULL
);

CREATE TABLE profile_skills (
    `profile_skill_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `skill_id` INTEGER NOT NULL,
    FOREIGN KEY (`profile_id`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`skill_id`) REFERENCES skills (`skill_id`)
);

CREATE TABLE education (
    `education_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `school_name` CHAR(50) NOT NULL,
    `edu_start_date` CHAR(50) NOT NULL,
    `edu_start_date` CHAR(50) NOT NULL,
    `gpa` DECIMAL(2, 1) NOT NULL,
    `certification_type` CHAR(50) NOT NULL,
    `edu_image_url` TEXT NOT NULL,
);

CREATE TABLE profile_education (
    `profile_education_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `education_id` INTEGER NOT NULL,
    FOREIGN KEY (`profile_id`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`education_id`) REFERENCES education (`education_id`)
);

CREATE TABLE experiences (
    `experience_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `exp_image_url` TEXT NOT NULL,
    `job_title` CHAR(50) NOT NULL,
    `exp_start_date` CHAR(50) NOT NULL,
    `exp_end_date` CHAR(50) NOT NULL,
    `employer` CHAR(50) NOT NULL
);

CREATE TABLE profile_experiences (
    `profile_experience_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `experience_id` INTEGER NOT NULL,
    FOREIGN KEY (`profile_id`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`experience_id`) REFERENCES experiences (`experience_id`)
);

CREATE TABLE awards_certifications (
    `award_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `title` CHAR(50) NOT NULL,
    `date_received` CHAR(50) NOT NULL,
    `awards_image_url` TEXT NOT NULL
);

CREATE TABLE profile_awards (
    `profile_award_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `award_id` INTEGER NOT NULL,
    FOREIGN KEY (`profile_id`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`award_id`) REFERENCES awards_certifications (`award_id`)
);

CREATE TABLE profile_preferences (
    `preference_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `category` CHAR(50) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES profiles (`profile_id`)
);

CREATE TABLE social_posts (
    `post_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `image_url` TEXT NOT NULL,
    `caption` TEXT NOT NULL,
    `location` CHAR(50),
    `post_date` TIMESTAMP DEFAULT NOW(),
    `likes` INTEGER NOT NULL DEFAULT 0,
    `comments` INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (`user_id`) REFERENCES profiles (`profile_id`)
);

CREATE TABLE post_comments (
    `comment_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL, 
    `comment` CHAR(255) NOT NULL,
    `is_a_reply` TINYINT(1) DEFAULT 0,
    `id_of_comment_receiving_reply` INTEGER, 
    `post_date` TIMESTAMP DEFAULT NOW(), 
    FOREIGN KEY (`post_id`) REFERENCES social_posts (`post_id`),
    FOREIGN KEY (`user_id`) REFERENCES profiles (`profile_id`)
);

CREATE TABLE post_likes (
    `like_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `like_date` TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (`post_id`) REFERENCES social_posts (`post_id`),
    FOREIGN KEY (`user_id`) REFERENCES profiles (`profile_id`)
);

CREATE TABLE messages (
    `message_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `conversation_id` INTEGER NOT NULL,
    `message_read` TINYINT(1),
    `message` CHAR(255) NOT NULL,
    `timestamp` TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (`sender_id`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`receiver_id`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`conversation_id`) REFERENCES conversations (`conversation_id`)
);

CREATE TABLE opportunites (
    `opportunity_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `employer` CHAR(50) NOT NULL,
    `category` CHAR(50) NOT NULL,
    `event_date` DATE NOT NULL,
    `poster_id` INTEGER NOT NULL,
    `title` CHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `requirements` TEXT,
    `image_url` TEXT NOT NULL,
    `post_date` TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (`category`) REFERENCES volunteer_categories (`category`),
    FOREIGN KEY (`poster_id`) REFERENCES profiles (`profile_id`)
);

CREATE TABLE opportunites_applicants (
    `application_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `applicant_username` CHAR(50) NOT NULL,
    `email` CHAR(100) NOT NULL,
    `phone_num` CHAR(10) NOT NULL,
    `city` CHAR(100) NOT NULL,
    `opportunity_id` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `accepted` TINYINT(1) DEFAULT -1,
    `timestamp` TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`opportunity_id`) REFERENCES opportunites (`opportunity_id`),
    FOREIGN KEY (`applicant_id`) REFERENCES profiles (`profile_id`)
);

CREATE TABLE volunteer_categories (
    `category` CHAR(50) PRIMARY KEY NOT NULL
);

CREATE TABLE notifications (
    `notifiation_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `profile_pic_url` TEXT NOT NULL,
    `post_pic_url` TEXT, 
    `message` TEXT NOT NULL,
    `type_of_event` CHAR(50) NOT NULL,
    `id_of_event` INTEGER NOT NULL,
    `timestamp` TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (`profile_id`) REFERENCES profiles (`profile_id`)
);

--TODO
CREATE TABLE stories (
    `story_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `image_url` TEXT NOT NULL,
    `timestamp` TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (`profile_id`) REFERENCES profiles (`profile_id`);
);

CREATE TABLE conversations (
    `conversation_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `user_id_1` INTEGER NOT NULL,
    `user_id_2` INTEGER NOT NULL,
    FOREIGN KEY (`user_id_1`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`user_id_2`) REFERENCES profiles (`profile_id`)
);

CREATE TABLE volunteer_categories (
    `category` CHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE preferred_categories (
    `profile_id` INTEGER NOT NULL,
    `category` CHAR(50) NOT NULL,
    FOREIGN KEY (`profile_id`) REFERENCES profiles (`profile_id`),
    FOREIGN KEY (`category`) REFERENCES volunteer_categories (`category`)
);