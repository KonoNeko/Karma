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
    const edu_keys = ["education_id", "school_name", "start_date", 
    "end_date", "gpa", "certification_type", "edu_image_url"];

    for (let i=0; i<object.length; i++) {
        // If current education entry doesnt exist
        if (!education[object[i]['education_id']]) { 
            let newEducation = filterObject(object[i], edu_keys);
            education[[i]['education_id']] = newEducation;
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
            skills[[i]['skill_id']] = newSkill;
        }
    }
    return skills;
}   

function fillExperience(object) {
    let experience = {};
    const exp_keys = ['experience_id', 'job_title', 'employer', 
    'exp_image_url'];

    for (let i=0; i<object.length; i++) {
        // If current experience entry doesnt exist
        if (!experience[object[i]['experience_id']]) { 
            let newExp = filterObject(object[i], exp_keys);
            experience[[i]['experience_id']] = newExp;
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
            awardsAndCertifications[[i]['award_id']] = newAC;
        }
    }
    return awardsAndCertifications;
}