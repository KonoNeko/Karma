INSERT INTO volunteer_categories (category)
VALUES
("Fine Arts and Culture"),
("Sports and Recreation"),
("Literacy, Libraries, and Learning"),
("Environment"),
("Health and Wellness"),
("Computers and Information Technology");


INSERT INTO opportunites (`poster_id`, `title`, `employer`, `category`, `description`, `requirements`, `event_date`, `image_url`)
VALUES
--(2, 'title', 'employer', 'category', 'description', 'requirements', 'format YYYY-MM-DD' 'image url'),
(2, 'Library Assistant', 'Guildford Library', 'Literacy, Libraries, and Learning', 'Be an assistant at a Library', '1-2 years experience at a library', '2021-05-30', 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png'),

(2, 'Camp Assistant', 'Bonsor Community Center', 'Sports and Recreation', 'Assist Camp leaders with daily activities', 'No requirements', '2021-06-22', 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png'),

(2, 'Concession Attendant', 'Edmonds Community Center', 'Sports and Recreation', 'Sell drinks and snacks to people', 'No requirements', '2021-05-25', 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png'),

(2, 'Park Clean Up', 'Riverway Sports Complex', 'Environment', 'Pick up trash and make sure park is clean', 'No requirements', '2021-06-30', 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png'),

(2, 'Feeding the Homeless', 'Downtown Vancouver', 'Health and Wellness', 'Hand out food to the homeless', 'No requirements', '2021-05-12', 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png'),

(2, 'Helping out at Senior Home', 'Burnaby B.C', 'Health and Wellness', 'Hang out with the Seniors', 'No requirements', '2021-05-21', 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png');



CALL new_education_entry("karma", "09-2019", "05-2021", NULL, "Computer Systems Technology", "https://imgur.com/D8Nhb9F", "British Columbia Institute of Technology");
CALL new_education_entry("karma", "04-2021", "05-2021", NULL, "Projects 2", "https://imgur.com/D8Nhb9F", "British Columbia Institute of Technology");
CALL new_education_entry("karma", "01-2021", "04-2021", NULL, "UI/UX Design", "https://imgur.com/D8Nhb9F", "British Columbia Institute of Technology");

CALL new_experience_entry("karma", "01-2020", "05-2020", "Public Park Attendant", "https://ctb.ku.edu/sites/default/files/chapter_files/group_of_volunteers_picking_garbage.jpg", "Concord Pacific Park");
CALL new_experience_entry("karma", "01-2020", "05-2020", "Front Desk Clerk", "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/images/experience.jpeg", "Burnaby Public Library");

CALL new_award_entry("karma", "Best Website", "05-2021", "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/images/awards.jpg");
CALL new_award_entry("karma", "Greatest Idea", "05-2021", "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/images/awards.jpg");

CALL new_skill_entry("karma", "Leadership");
CALL new_skill_entry("karma", "Creativity");
CALL new_skill_entry("karma", "Problem Solving");

