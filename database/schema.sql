/* This file holds the structure and table definitions of the Karma Database */

CREATE TABLE profiles (
    'profile_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'username' CHAR(50) NOT NULL,
    'full_name' CHAR(100) NOT NULL,
    'bio' CHAR(400) DEFAULT "",
    'posts' INTEGER DEFAULT 0,
    'followers' INTEGER DEFAULT 0,
    'following' INTEGER DEFAULT 0,
    'is_Volunteer' TINYINT(1) NOT NULL
);

CREATE TABLE profile_follows (
    'follow_id' INTEGER PRIMARY KEY AUTO_INCREMENT,
    'profile_id' INTEGER NOT NULL,
    'follower_id' INTEGER NOT NULL,
    FOREIGN KEY ('profile_id') REFERENCES profiles ('profile_id'),
    FOREIGN KEY ('follower_id') REFERENCES profiles ('profile_id')
);