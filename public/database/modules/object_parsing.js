function filterObject(object, keys) {
    let cleanObj = {};
    for (let i=0; i<keys.length; i++) {
        cleanObj[keys[i]] = object[keys[i]];
    }
    return cleanObj;
}

function fillProfile(object) {
    const profile_keys = ["profile_id", "username", "full_name", 
    "bio", "posts", "followers", "following", "profile_pic_url", 
    "is_volunteer"];

    return filterObject(object, profile_keys);
}

function fillEducation(object) {
    let education = {};
    const edu_keys = ["education_id", "school_name", "edu_start_date", 
    "edu_end_date", "gpa", "certification_type", "edu_image_url"];

    for (let i=0; i<object.length; i++) {
        // If current education entry doesnt exist
        if (!education[object[i]['education_id']]) { 
            let newEducation = filterObject(object[i], edu_keys);
            education[object[i]['education_id']] = newEducation;
        }
    }
    return education;
}

function fillSkills(object) {
    let skills = {};
    const skill_keys = ['skill_id', 'skill_title'];

    for (let i=0; i<object.length; i++) {
        // If current skill entry doesnt exist
        if (!skills[object[i]['skill_id']]) { 
            let newSkill = filterObject(object[i], skill_keys);
            skills[object[i]['skill_id']] = newSkill;
        }
    }
    return skills;
}   

function fillExperience(object) {
    let experience = {};
    const exp_keys = ['experience_id', 'job_title', 'employer', 
    'exp_image_url', 'exp_start_date', 'exp_end_date'];

    for (let i=0; i<object.length; i++) {
        // If current experience entry doesnt exist
        if (!experience[object[i]['experience_id']]) { 
            let newExp = filterObject(object[i], exp_keys);
            experience[object[i]['experience_id']] = newExp;
        }
    }
    return experience;
}

function fillCertifications(object) {
    let awardsAndCertifications = {};
    const awards_keys = ['award_id', 'title', 'date_received', 
    'awards_image_url'];

    for (let i=0; i<object.length; i++) {
        // If current experience entry doesnt exist
        if (!awardsAndCertifications[object[i]['award_id']]) { 
            let newAC = filterObject(object[i], awards_keys);
            awardsAndCertifications[object[i]['award_id']] = newAC;
        }
    }
    return awardsAndCertifications;
}


function fillComments(object, currentPost) {
    let comment_keys = ['comment_id', 'post_id', 'user_id', 'comment', 
    'is_a_reply', 'id_of_comment_receiving_reply', 'comment_date', 'commenter_profile_pic', 'comment_poster'];
    let comments = {};
    let commentNum = 0;
    for (let i=0; i<object.length; i++) {
        if (object[i]['post_id'] == currentPost && object[i]['comment_id']) {
            let currentID = object[i]['comment_id'];
            if (object[i]['is_a_reply']) {
                let comment_being_replied_to = object[i]['id_of_comment_receiving_reply'];
                
                // If a replies object doesn't exist yet
                if(!comments[comment_being_replied_to]['replies']) {
                    comments[comment_being_replied_to]['replies'] = {};
                } else if (!comments[comment_being_replied_to]['replies'][currentID]) {
                    comments[comment_being_replied_to]['replies'][currentID] = filterObject(object[i], comment_keys);
                    commentNum++;
                }
            } else if (!comments[currentID]) {
            // If current comment isn't parsed
                comments[currentID] = filterObject(object[i], comment_keys);
                commentNum++;
            }
        }
    }
    comments.totalComments = commentNum;
    return comments;
}

function fillSocialPost(object, currentPost) {
    if (!currentPost) {
        currentPost = 0;
    } 
    let post = {};
    const post_keys = ['post_id', 'image_url', 'caption', 
    'location', 'post_date', 'likes', 'username', 'profile_pic_url'];

    post.post_info = filterObject(object[currentPost], post_keys);
    post.comments = fillComments(object, object[currentPost]['post_id']);
    return post;
}

function postExists(posts, id) {
    for(let i = 0; i < posts.length; i++) {
        if (posts[i].post_info.post_id == id) {
            return true;
        }
    }
    return false;
}

function fillSocialPosts(object) {
    let posts = [];
    for (let i=0; i<object.length; i++) {
        let currentID = object[i]['post_id'];
        if (!postExists(posts, currentID)) {
            // If current post isn't parsed
                posts.push(fillSocialPost(object, i));
        }
    }
    return posts;
}



function sortOpportunities(object) {
    let opportunities = {
        "Fine Arts and Culture": {}, 
        "Sports and Recreation": {},
        "Literacy, Libraries, and Learning": {}, 
        "Environment": {}, 
        "Health and Wellness": {},
        "Computers and Information Technology": {}
    };

    for (let i=0; i<object.length; i++) {
        let currentID = object[i]['opportunity_id'];
        let currentCategory = object[i]['category'];
        opportunities[currentCategory][currentID] = object[i];
        opportunities["Recommended For You"][currentID] = object[i];
    }
    return opportunities;
}


function fillMessages(object, currentConvo) {
    let msg_keys = ["message_id", "sender", "message", "message_timestamp"];
    let messages = [];
    for (let i=0; i<object.length; i++) {
        if (object[i]['conversation_id'] == currentConvo) {
            messages.push(filterObject(object[i], msg_keys));
        }
    }
    return messages;
}


function fillConversations(object) {
    let conversations = {};
    let convo_keys = ["conversation_id", "other_user", "other_user_fullname",
    "other_user_profile_pic", "profile_pic", "latest_message", "latest_message_timestamp", "has_unread_messages"];

    for (let i=0; i<object.length; i++) {
        let currentTime = object[i].latest_message_timestamp;
        let currentID = object[i].conversation_id;
        if (!conversations[currentTime]) {
            // If current conversation doesn't exist
            let currentConversation = filterObject(object[i], convo_keys);
            currentConversation.messages = fillMessages(object, currentID);
            conversations[currentTime] = currentConversation;
        }
    }
    return conversations
}



module.exports.profile = fillProfile;
module.exports.education = fillEducation;
module.exports.experience = fillExperience;
module.exports.skills = fillSkills;
module.exports.certifications = fillCertifications;
module.exports.comments = fillComments;
module.exports.opportunities = sortOpportunities;
module.exports.post = fillSocialPost;
module.exports.posts = fillSocialPosts;
module.exports.conversations = fillConversations;