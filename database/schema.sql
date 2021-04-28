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