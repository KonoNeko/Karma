/* This file holds the structure and table definitions of the Karma Database */

CREATE TABLE profiles (
    'profile_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'username' CHAR(50) NOT NULL,
    'full_name' CHAR(100) NOT NULL,
    'bio' CHAR(400) DEFAULT "",
    'posts' INTEGER DEFAULT 0,
    'followers' INTEGER DEFAULT 0,
    'following' INTEGER DEFAULT 0,
    'is_volunteer' TINYINT(1) NOT NULL
);

CREATE TABLE profile_follows (
    'follow_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'profile_id' INTEGER NOT NULL,
    'follower_id' INTEGER NOT NULL,
    FOREIGN KEY ('profile_id') REFERENCES profiles ('profile_id'),
    FOREIGN KEY ('follower_id') REFERENCES profiles ('profile_id')
);

CREATE TABLE skills (
    'skill_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'skill_title' CHAR(50) NOT NULL
);

CREATE TABLE profile_skills (
    'profile_skill_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'profile_id' INTEGER NOT NULL,
    'skill_id' INTEGER NOT NULL,
    FOREIGN KEY ('profile_id') REFERENCES profiles ('profile_id'),
    FOREIGN KEY ('skill_id') REFERENCES skills ('skill_id')
);

CREATE TABLE education (
    'education_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'school_name' CHAR(50) NOT NULL,
    'start_date' CHAR(50) NOT NULL,
    'end_date' CHAR(50) NOT NULL,
    'gpa' DECIMAL(1, 1) NOT NULL,
    'certification' CHAR(50) NOT NULL
);

CREATE TABLE profile_education (
    'profile_education_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'profile_id' INTEGER NOT NULL,
    'education_id' INTEGER NOT NULL,
    FOREIGN KEY ('profile_id') REFERENCES profiles ('profile_id'),
    FOREIGN KEY ('education_id') REFERENCES education ('education_id')
);

CREATE TABLE experiences (
    'experience_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'job_title' CHAR(50) NOT NULL,
    'start_date' CHAR(50) NOT NULL,
    'end_date' CHAR(50) NOT NULL,
    'employer' CHAR(50) NOT NULL
)

CREATE TABLE profile_experiences (
    'profile_experience_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'profile_id' INTEGER NOT NULL,
    'experience_id' INTEGER NOT NULL,
    FOREIGN KEY ('profile_id') REFERENCES profiles ('profile_id'),
    FOREIGN KEY ('experience_id') REFERENCES experiences ('experience_id')
);

CREATE TABLE awards_certifications (
    'award_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'title' CHAR(50) NOT NULL,
    'date_received' CHAR(50) NOT NULL
);

CREATE TABLE profile_awards (
    'profile_award_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'profile_id' INTEGER NOT NULL,
    'award_id' INTEGER NOT NULL,
    FOREIGN KEY ('profile_id') REFERENCES profiles ('profile_id'),
    FOREIGN KEY ('award_id') REFERENCES awards_certifications ('award_id')
);

CREATE TABLE social_posts (
    'post_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'user_id' INTEGER NOT NULL,
    'image_url' TEXT NOT NULL,
    'caption' CHAR(400) NOT NULL,
    'location' CHAR(50),
    'post_date' TIMESTAMP DEFAULT NOW(),
    'likes' INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY ('user_id') REFERENCES profiles ("profile_id")
);

CREATE TABLE post_comments (
    'comment_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'post_id' INTEGER NOT NULL,
    'user_id' INTEGER NOT NULL, 
    'comment' CHAR(200) NOT NULL,
    'post_date' DATE DEFAULT NOW(), 
    FOREIGN KEY ('post_id') REFERENCES social_posts ('post_id'),
    FOREIGN KEY ('user_id') REFERENCES profiles ('profile_id')
);

CREATE TABLE post_likes (
    'like_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'post_id' INTEGER NOT NULL,
    'user_id' INTEGER NOT NULL,
    'like_date' TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ('post_id') REFERENCES social_posts ('post_id'),
    FOREIGN KEY ('user_id') REFERENCES profiles ('profile_id')
);

CREATE TABLE messages (
    'message_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'sender_id' INTEGER NOT NULL,
    'receiver_id' INTEGER NOT NULL,
    'message' CHAR(200) NOT NULL,
    'timestamp' TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ('sender_id') REFERENCES profiles ('profile_id'),
    FOREIGN KEY ('receiver_id') REFERENCES profiles ('profile_id')
);

CREATE TABLE opportunites {
    'opportunity_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'poster_id' INTEGER NOT NULL,
    'title' CHAR(50) NOT NULL,
    'description' CHAR(400) NOT NULL,
    'requirements' CHAR(400),
    'post_date' TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ('poster_id') REFERENCES profiles ('profile_id')
}

CREATE TABLE opportunites_applicants (
    'application_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'applicant_id' INTEGER NOT NULL,
    'opportunity_id' INTEGER NOT NULL,
    'message' CHAR(400) NOT NULL,
    FOREIGN KEY ('opportunity_id') REFERENCES opportunites ('opportunity_id'),
    FOREIGN KEY ('applicant_id') REFERENCES profiles ('profile_id')
);

CREATE TABLE volunteer_categories (
    'category_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'category' CHAR(50) NOT NULL
);