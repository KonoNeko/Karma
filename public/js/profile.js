

const BASE_URL = "https://marlonfajardo.ca/karma/v1";

let result = {
  "info": {
    "profile_id": 1,
    "username": "marlon",
    "full_name": "Marlon Fajardo",
    "bio": "This is my bio",
    "posts": 2,
    "followers": 0,
    "following": 0,
    "profile_pic_url": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    "is_volunteer": 1
  },
  "education": {
    "1": {
      "education_id": 1,
      "school_name": "Burnaby South Secondary",
      "start_date": "06/2020",
      "end_date": "01/2021",
      "gpa": 3.5,
      "certification_type": "High School Diploma",
      "edu_image_url": "https://www.studyinburnaby.ca/wp-content/uploads/2017/05/Burnaby-South-Secondary.jpg"
    },
    "2": {
      "education_id": 2,
      "school_name": "British Columbia Institute of Technology",
      "start_date": "06/2020",
      "end_date": "01/2021",
      "gpa": 3.5,
      "certification_type": "Technical Diploma",
      "edu_image_url": "https://pbs.twimg.com/profile_images/1291056095440433152/fKpCeIld_400x400.png"
    }
  },
  "skills": {
    "1": {
      "skill_id": 1,
      "skill_title": "Creativity"
    },
    "2": {
      "skill_id": 2,
      "skill_title": "Leadership"
    },
    "3": {
      "skill_id": 3,
      "skill_title": "Problem Solving"
    },
    "4": {
      "skill_id": 4,
      "skill_title": "Communication"
    }
  },
  "experience": {
    "1": {
      "experience_id": 1,
      "job_title": "Warehouse Associate",
      "employer": "Continental Importers",
      "exp_image_url": "https://www.eastvillagevancouver.ca/wp-content/uploads/2016/07/static1.squarespace.jpg"
    },
    "2": {
      "experience_id": 2,
      "job_title": "Production Specialist",
      "employer": "Fine Line Signs",
      "exp_image_url": "https://s3-media0.fl.yelpcdn.com/bphoto/0naXOdpTDnO34kJob1ajLQ/ls.jpg"
    }
  },
  "certifications": {
    "1": {
      "experience_id": 1,
      "job_title": "Warehouse Associate",
      "employer": "Continental Importers",
      "exp_image_url": "https://www.eastvillagevancouver.ca/wp-content/uploads/2016/07/static1.squarespace.jpg"
    },
    "2": {
      "experience_id": 2,
      "job_title": "Production Specialist",
      "employer": "Fine Line Signs",
      "exp_image_url": "https://s3-media0.fl.yelpcdn.com/bphoto/0naXOdpTDnO34kJob1ajLQ/ls.jpg"
    }
  }
};










let width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

let height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

window.onresize = function () {
  location.reload();
  width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
};

function view_profile(userID) {
  const method = "GET";
  const endpoint = "/profiles";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;
  let result = APIRequestViewProfile(method, url);
  console.log(result);
}

function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // let result = JSON.parse(this.responseText);
      console.log("success editing profile");
      // console.log(result);
      // for (let i=0; i<result.length; i++) {
      //     loadProfile(result[i]);
      // }
    }
  };
}

function APIRequestViewProfile(method, url) {
  loadProfile(result);
  // console.log(method + ": " + url);
  // const xhttp = new XMLHttpRequest();
  // xhttp.open(method, url, true);
  // xhttp.send();
  // xhttp.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     // let result = JSON.parse(this.responseText);
  //     console.log("success editing profile");
  //     console.log(result);
  //     loadProfile(result);

  //   }
  // };
}

function add_Skills(userID, skill) {
  const method = "PUT";
  const endpoint = "/profiles/skills";
  const params = formatParams({
    "id": userID,
    "skill": skill,

  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}




function add_Education(userID, schoolName, description, gpa, start, end, img) {
  const method = "POST";
  const endpoint = "/profiles/education";
  const params = formatParams({
    "id": userID,
    "name": schoolName,
    "type": description,
    "gpa": gpa,
    "start": start,
    "end": end,
    "img": img,
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}

function add_Experience(userID, jobName, workplaceName, start, end, img) {
  const method = "POST";
  const endpoint = "/profiles/experience";
  const params = formatParams({
    "id": userID,
    "name": jobName,
    "employer": workplaceName,
    "start": start,
    "end": end,
    "img": img,
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}


function add_Awards(userID, awardTitle, date, img) {
  const method = "POST";
  const endpoint = "/profiles/experience";
  const params = formatParams({
    "id": userID,
    "title": awardTitle,
    "date": date,
    "img": img,
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}


function add_Description(userID, bio) {
  const method = "POST";
  const endpoint = "/profiles/bio";
  const params = formatParams({
    "id": userID,
    "bio": bio,
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}

function showProfile() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        console.log(user.name);
        console.log(user.email);
        document.getElementById("name").innerHTML = user.name;
        document.getElementById("email").innerHTML = user.email;
      })

      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
}

function showImages() {
  var storage = firebase.storage();
  var storageRef = storage.ref();

  $("#List").find("tbody").html("");

  var i = 0;

  storageRef
    .child("images/" + "profilePicture/")
    .listAll()
    .then(function (result) {
      result.items.forEach(function (imageRef) {
        i++;
        displayImage(i, imageRef);
      });
    });
  function displayImage(row, images) {
    images.getDownloadURL().then(function (url) {
      console.log(url);

      let new_html = "";
      new_html += "<tr>";
      new_html += "<td>";
      new_html += row;
      new_html += "</td>";
      new_html += "<td>";
      new_html +=
        '<img src= " ' + url + ' " width="100px" style= "float:right">';
      new_html += "</td>";
      new_html += "</tr>";
      // $('#List').find('tbody').append(new_html);

      let myImg = `
    <div><br>
      <img src="${url}" width="90%" height="90%"><br>
      <button id="like">Like</button>
      <br>
    </div>
    `;

      $("#postDiv").append(myImg);
    });
  }
}

// WINDOW ONLOAD FUNCTION FOR THE PROFILE PAGE
function loadProfile(profileObj) {
  console.log(profileObj);
  console.log(height);
  loadAboutMe(profileObj);
  loadPosts(profileObj);
  loadNumPosts(profileObj);
  loadSkills(profileObj);
  loadEducation(profileObj);
  loadExperience(profileObj);
  loadAwards(profileObj);
  loadProfilepic(profileObj);
  // loadFollowers();
  // loadFollowing();
  loadWhatsNew();
  loadRecommendedConnections();
}

// READING INFORMATION FROM THE DATABASE
function loadAboutMe(profileObj) {
  let aboutme = document.getElementById("aboutme");
  createAboutMe(aboutme, profileObj);
}

function loadPosts(profileObj) {
  let posts = document.getElementById("posts");
  createPost(posts, profileObj);
  createPost(posts);
}

function loadNumPosts(profileObj) {
  // let numPosts = document.getElementById("numPosts");
  // createNumPosts(numPosts)
}

function loadSkills(profileObj) {
  let skills = document.getElementById("skills");
  for (let key of Object.keys(profileObj.skills)) {
    createSkills(skills, profileObj.skills[key]);
    console.log(profileObj.skills[key]);
    console.log(key);
  }
  // createSkills(skills,profileObj);
  // createSkills(skills,profileObj);
  // createSkills(skills,profileObj);
  // createSkills(skills,profileObj);
  // createSkills(skills,profileObj);
  // createSkills(skills,profileObj);
}

function loadEducation(profileObj) {
  let education = document.getElementById("education");
  for (let key of Object.keys(profileObj.education))
    createEducation(education, profileObj.education[key]);
    // console.log(profileObj.education[key])
  // createEducation(education,profileObj);
}

function loadExperience(profileObj) {
  let experience = document.getElementById("experience");
  for (let key of Object.keys(profileObj.experience))
    createExperience(experience, profileObj.experience[key]);
}

function loadAwards(profileObj) {
  let awards = document.getElementById("awards");
  createAwards(awards, profileObj);
  createAwards(awards, profileObj);
}

function loadProfilepic(profileObj) {
  let profilepic = document.getElementById("profile");
  createProfilePic(profilepic, profileObj);
}

function loadFollowing(profileObj) {
  let following = document.getElementById("following");
  createFollowing(following, profileObj);
}

function loadFollowers(profileObj) {
  let follower = document.getElementById("followers");
  createFollowers(follower, profileObj);
}

function loadWhatsNew() {
  let whatsNew = document.getElementById(
    "whats-new-volunteering-opportunities"
  );
  createWhatsNew(whatsNew);
  createWhatsNew(whatsNew);
  createWhatsNew(whatsNew);
}

function loadRecommendedConnections() {
  let recommendedUsers = document.getElementById("recommended-connections");

  let heading2 = document.createElement("hr");
  heading2.setAttribute("class", "headers");
  recommendedUsers.appendChild(heading2);

  createRecommendedConnection(recommendedUsers);
  createRecommendedConnection(recommendedUsers);
  createRecommendedConnection(recommendedUsers);

  let viewAll = document.createElement("a");
  viewAll.id = "view-all";
  viewAll.href = "";
  viewAll.innerHTML = "View all recommended connections";

  recommendedUsers.appendChild(viewAll);
}


function addAboutMe() {
  console.log("Add skills button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addAboutMeHeading = document.createElement("p");
  addAboutMeHeading.setAttribute("class", "heading3");
  addAboutMeHeading.innerHTML = "Add a description for your bio";
  addAboutMeHeading.setAttribute("style", "text-align: left");

  let addAboutMeInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addAboutMeHeading);
  document.getElementById("button-content").appendChild(addAboutMeInput);

  $("#save").click(function () {
    let bio = addEducationInput1.value;
    add_Description(bio);
  });





}






function addSkills() {
  console.log("Add skills button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addSkillsHeading = document.createElement("p");
  addSkillsHeading.setAttribute("class", "heading3");
  addSkillsHeading.innerHTML = "Add skills";
  addSkillsHeading.setAttribute("style", "text-align: left");

  let addSkillsInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addSkillsHeading);
  document.getElementById("button-content").appendChild(addSkillsInput);


  $("#save").click(function () {
    let skill = addSkillsInput.value;

    add_Skills(skill);
  });


}

function addEducation() {
  console.log("Add education button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addEducationHeading1 = document.createElement("p");
  addEducationHeading1.setAttribute("class", "heading3");
  addEducationHeading1.innerHTML = "Please enter the name of your school";
  addEducationHeading1.setAttribute("style", "text-align: left");

  let addEducationInput1 = document.createElement("textarea");
  addEducationInput1.setAttribute("style", "height: 30px");

  let addEducationHeading2 = document.createElement("p");
  addEducationHeading2.setAttribute("class", "heading3");
  addEducationHeading2.innerHTML = "Please enter your gpa:";
  addEducationHeading2.setAttribute("style", "text-align: left");

  let addEducationInput2 = document.createElement("textarea");
  addEducationInput2.setAttribute("style", "height: 30px");

  let addEducationHeading3 = document.createElement("p");
  addEducationHeading3.setAttribute("class", "heading3");
  addEducationHeading3.innerHTML = "Please enter the date your started";
  addEducationHeading3.setAttribute("style", "text-align: left");

  let addEducationInput3 = document.createElement("textarea");
  addEducationInput3.setAttribute("style", "height: 30px");

  let addEducationHeading4 = document.createElement("p");
  addEducationHeading4.setAttribute("class", "heading3");
  addEducationHeading4.innerHTML = "Please enter the date you ended";
  addEducationHeading4.setAttribute("style", "text-align: left");

  let addEducationInput4 = document.createElement("textarea");
  addEducationInput4.setAttribute("style", "height: 30px");

  let addEducationHeading5 = document.createElement("p");
  addEducationHeading5.setAttribute("class", "heading3");
  addEducationHeading5.innerHTML = "Please add a image of your school";
  addEducationHeading5.setAttribute("style", "text-align: left");

  let addEducationInput5 = document.createElement("button");
  addEducationInput5.setAttribute("style", "height: 20px");

  let addEducationHeading = document.createElement("p");
  addEducationHeading.setAttribute("class", "heading3");
  addEducationHeading.innerHTML = "Please add the type of certification earned";
  addEducationHeading.setAttribute("style", "text-align: left");

  let addEducationInput = document.createElement("textarea");
  addEducationInput.setAttribute("style", "height: 30px");

  document.getElementById("button-content").appendChild(addEducationHeading1);
  document.getElementById("button-content").appendChild(addEducationInput1);
  document.getElementById("button-content").appendChild(addEducationHeading);
  document.getElementById("button-content").appendChild(addEducationInput);
  document.getElementById("button-content").appendChild(addEducationHeading2);
  document.getElementById("button-content").appendChild(addEducationInput2);
  document.getElementById("button-content").appendChild(addEducationHeading3);
  document.getElementById("button-content").appendChild(addEducationInput3);
  document.getElementById("button-content").appendChild(addEducationHeading4);
  document.getElementById("button-content").appendChild(addEducationInput4);
  document.getElementById("button-content").appendChild(addEducationHeading5);
  document.getElementById("button-content").appendChild(addEducationInput5);

  // userID, schoolName, description, gpa, start, end, img
  $("#save").click(function () {
    let schoolName = addEducationInput1.value;
    let description = addEducationInput.value;
    let gpa = addEducationInput2.value;
    let start = addEducationInput3.value;
    let end = addEducationInput4.value;
    let img = addEducationInput5.value;

    add_Education(schoolName, description, gpa, start, end, img);
  });
}

function addExperience() {
  console.log("Add experience button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addExperienceHeading1 = document.createElement("p");
  addExperienceHeading1.setAttribute("class", "heading3");
  addExperienceHeading1.innerHTML = "Please enter the job title";
  addExperienceHeading1.setAttribute("style", "text-align: left");

  let addExperienceInput1 = document.createElement("textarea");
  addExperienceInput1.setAttribute("style", "height: 30px");

  let addExperienceHeading = document.createElement("p");
  addExperienceHeading.setAttribute("class", "heading3");
  addExperienceHeading.innerHTML = "Please eneter the name of the workplace";
  addExperienceHeading.setAttribute("style", "text-align: left");

  let addExperienceInput = document.createElement("textarea");
  addExperienceInput.setAttribute("style", "height: 30px");

  let addExperienceHeading2 = document.createElement("p");
  addExperienceHeading2.setAttribute("class", "heading3");
  addExperienceHeading2.innerHTML = "Please eneter the start date";
  addExperienceHeading2.setAttribute("style", "text-align: left");

  let addExperienceInput2 = document.createElement("textarea");
  addExperienceInput2.setAttribute("style", "height: 30px");

  let addExperienceHeading3 = document.createElement("p");
  addExperienceHeading3.setAttribute("class", "heading3");
  addExperienceHeading3.innerHTML = "Please enter the end date";
  addExperienceHeading3.setAttribute("style", "text-align: left");

  let addExperienceInput3 = document.createElement("textarea");
  addExperienceInput3.setAttribute("style", "height: 30px");

  let addExperienceHeading4 = document.createElement("p");
  addExperienceHeading4.setAttribute("class", "heading3");
  addExperienceHeading4.innerHTML = "Please add a image of your workplace";
  addExperienceHeading4.setAttribute("style", "text-align: left");

  let addExperienceInput4 = document.createElement("button");
  addExperienceInput4.setAttribute("style", "height: 30px");

  document.getElementById("button-content").appendChild(addExperienceHeading1);
  document.getElementById("button-content").appendChild(addExperienceInput1);
  document.getElementById("button-content").appendChild(addExperienceHeading);
  document.getElementById("button-content").appendChild(addExperienceInput);
  document.getElementById("button-content").appendChild(addExperienceHeading2);
  document.getElementById("button-content").appendChild(addExperienceInput2);
  document.getElementById("button-content").appendChild(addExperienceHeading3);
  document.getElementById("button-content").appendChild(addExperienceInput3);
  document.getElementById("button-content").appendChild(addExperienceHeading4);
  document.getElementById("button-content").appendChild(addExperienceInput4);

  // userID, jobName, workplaceName, start, end, img
  $("#save").click(function () {
    let jobName = addExperienceInput1.value;
    let workplaceName = addExperienceInput.value;
    let start = addExperienceInput2.value;
    let end = addExperienceInput3.value;
    let img = addExperienceInput4.value;

    add_Experience(jobName, workplaceName, start, end, img);
  });




}

function addAwards() {
  console.log("Add education button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addAwardHeading1 = document.createElement("p");
  addAwardHeading1.setAttribute("class", "heading3");
  addAwardHeading1.innerHTML = "Please enter the name of the certificate/award";
  addAwardHeading1.setAttribute("style", "text-align: left");

  let addAwardInput1 = document.createElement("textarea");
  addAwardInput1.setAttribute("style", "height: 30px");

  let addAwardHeading2 = document.createElement("p");
  addAwardHeading2.setAttribute("class", "heading3");
  addAwardHeading2.innerHTML = "Please enter the date the award was recieved:";
  addAwardHeading2.setAttribute("style", "text-align: left");

  let addAwardInput2 = document.createElement("textarea");
  addAwardInput2.setAttribute("style", "height: 30px");


  let addAwardHeading3 = document.createElement("p");
  addAwardHeading3.setAttribute("class", "heading3");
  addAwardHeading3.innerHTML = "Please add a image of the certificate/award";
  addAwardHeading3.setAttribute("style", "text-align: left");

  let addAwardInput3 = document.createElement("button");
  addAwardInput3.setAttribute("style", "height: 20px");


  document.getElementById("button-content").appendChild(addAwardHeading1);
  document.getElementById("button-content").appendChild(addAwardInput1);
  document.getElementById("button-content").appendChild(addAwardHeading2);
  document.getElementById("button-content").appendChild(addAwardInput2);
  document.getElementById("button-content").appendChild(addAwardHeading3);
  document.getElementById("button-content").appendChild(addAwardInput3);




  $("#save").click(function () {
    let awardTitle = addAwardInput1.value;
    let date = addAwardInput2.value;
    let img = addAwardInput3.value;


    add_Awards(awardTitle, date, img);
  });
}














function createNumPosts(numPosts) {
  let post = document.createElement("p");
  post.setAttribute("class", "followers");
  post.innerHTML = "1";

  numPosts.appendChild(post);
}

function createAboutMe(aboutMe, aboutMeObj) {
  let aboutdiv = document.createElement("div");
  aboutdiv.setAttribute("class", "aboutdiv");

  let about = document.createElement("p");
  about.setAttribute("class", "about");
  about.setAttribute("style", "margin-right: 20px;");
  about.innerHTML = `${aboutMeObj.info.bio}`;

  aboutdiv.appendChild(about);
  aboutMe.appendChild(aboutdiv);
}

function createProfilePic(profile) {
  // let picture = document.createElement("img");
  // picture.setAttribute("class", "postpicture");
  // picture.setAttribute(
  //   "style",
  //   "background-image: url('./images/placeholder.jpg')"
  // );
  // profile.appendChild(picture);
}


function createSkills(skills, skillsObj) {
  let skillbtn = document.createElement("button");
  skillbtn.setAttribute("class", "skillsbtn");
  skillbtn.innerHTML = `${skillsObj.skill_title}`;
  console.log(skillsObj);
  // console.log(skillsObj.skill_title);

  skills.appendChild(skillbtn);
}
function createPost(posts) {
  let postdiv = document.createElement("div");
  postdiv.setAttribute("class", "postdiv");

  let picture = document.createElement("img");
  picture.setAttribute("class", "postpic");
  picture.src = "./images/placeholder.jpg";

  postdiv.appendChild(picture);
  // picture.setAttribute(
  //   "style",
  //   "background-image: url('./images/placeholder.jpg')"
  // );
  posts.appendChild(postdiv);
}
function createEducation(education, educationObj) {
  let heading1 = document.createElement("p");
  heading1.setAttribute("class", "heading3");
  heading1.setAttribute("style", "font-weight: bold");
  heading1.innerHTML = `${educationObj.school_name}`;

  let educationdiv = document.createElement("div");
  educationdiv.setAttribute("class", "education-post-div");

  let picturediv = document.createElement("div");
  picturediv.setAttribute("class", "postpreviewpicture");

  let educationInfoDiv = document.createElement("div");

  let picture = document.createElement("img");
  picture.setAttribute("class", "educationpic");
  picture.src = "./images/education.jpeg";

  let para = document.createElement("p");
  para.setAttribute("class", "schoolpara");
  para.innerHTML = `${educationObj.start_date}`;

  picturediv.appendChild(picture);

  educationdiv.appendChild(picturediv);
  educationdiv.appendChild(educationInfoDiv);

  educationInfoDiv.appendChild(heading1);
  educationInfoDiv.appendChild(para);
  educationInfoDiv.setAttribute(
    "style",
    "margin-left: 20px; margin-right: 20px;"
  );

  education.appendChild(educationdiv);
  educationdiv.setAttribute("style", "margin-top: 10px");
}

function createExperience(experience, experienceObj) {
  let heading1 = document.createElement("p");
  heading1.setAttribute("class", "heading3");
  heading1.setAttribute("style", "font-weight: bold");
  heading1.innerHTML = `${experienceObj.job_title}`;

  let experiencendiv = document.createElement("div");
  experiencendiv.setAttribute("class", "experience-post-div");

  let picturediv = document.createElement("div");
  picturediv.setAttribute("class", "postpreviewpicture");

  let experienceInfoDiv = document.createElement("div");

  let picture = document.createElement("img");
  picture.setAttribute("class", "experiencepic");
  picture.src = "./images/experience.jpeg";

  let para = document.createElement("p");
  para.setAttribute("class", "schoolpara");
  para.innerHTML = `${experienceObj.employer}`;

  picturediv.appendChild(picture);

  experiencendiv.appendChild(picturediv);
  experiencendiv.appendChild(experienceInfoDiv);

  experienceInfoDiv.appendChild(heading1);
  experienceInfoDiv.appendChild(para);
  experienceInfoDiv.setAttribute(
    "style",
    "margin-left: 20px; margin-right: 20px;"
  );

  experience.appendChild(experiencendiv);
  experiencendiv.setAttribute("style", "margin-top: 10px");
}

function createAwards(awards) {
  let heading1 = document.createElement("p");
  heading1.setAttribute("class", "heading3");
  heading1.setAttribute("style", "font-weight: bold");
  heading1.innerHTML = "District Authority Award in English Literature";

  let experiencendiv = document.createElement("div");
  experiencendiv.setAttribute("class", "experience-post-div");

  let picturediv = document.createElement("div");
  picturediv.setAttribute("class", "postpreviewpicture");

  let experienceInfoDiv = document.createElement("div");

  let picture = document.createElement("img");
  picture.setAttribute("class", "experiencepic");
  picture.src = "./images/awards.jpg";

  let para = document.createElement("p");
  para.setAttribute("class", "schoolpara");
  para.innerHTML = "Received in November 2019";

  picturediv.appendChild(picture);

  experiencendiv.appendChild(picturediv);
  experiencendiv.appendChild(experienceInfoDiv);

  experienceInfoDiv.appendChild(heading1);
  experienceInfoDiv.appendChild(para);
  experienceInfoDiv.setAttribute(
    "style",
    "margin-left: 20px; margin-right: 20px;"
  );

  awards.appendChild(experiencendiv);
  experiencendiv.setAttribute("style", "margin-top: 10px");
}

function createFollowers(followerObj) {
  let follow = document.createElement("p");
  follow.setAttribute("class", "followers");
  follow.innerHTML = `${followerObj["info"]["followers"]}`;

  follower.appendChild(follow);
}

function createFollowing(followingObj) {
  let follows = document.createElement("p");
  follows.setAttribute("class", "following");
  follows.innerHTML = `${followingObj["info"]["following"]}`;;

  following.appendChild(follows);
}

function createRecommendedConnection(recommended) {
  // let heading = document.createElement("hr");
  // heading.setAttribute("class", "headers");

  // recommended.appendChild(heading);

  let recommendedUserDiv = document.createElement("div");
  recommendedUserDiv.setAttribute("class", "recommendedUserDiv");

  let storyImgDiv = document.createElement("div");
  storyImgDiv.setAttribute("class", "profilepic");
  storyImgDiv.setAttribute("style", "padding-bottom: 10px");

  storyImgDiv.setAttribute(
    "style",
    "background-image: url('./images/placeholder.jpg')"
  );

  let nameAndUserName = document.createElement("div");
  nameAndUserName.setAttribute("class", "name-and-userName");

  let userName = document.createElement("p");
  userName.setAttribute("class", "userNames");
  userName.innerHTML = "User name";

  let userNameAt = document.createElement("p");
  userNameAt.setAttribute("class", "userAt");
  userNameAt.innerHTML = "@Username";

  recommendedUserDiv.appendChild(storyImgDiv);
  nameAndUserName.appendChild(userName);
  nameAndUserName.appendChild(userNameAt);

  recommendedUserDiv.appendChild(nameAndUserName);

  let followUser = document.createElement("div");
  followUser.innerHTML = "FOLLOW";
  followUser.setAttribute("class", "followUser");

  recommendedUserDiv.appendChild(followUser);

  let heading2 = document.createElement("hr");
  heading2.setAttribute("class", "headers");

  recommended.appendChild(recommendedUserDiv);
  recommended.appendChild(heading2);

  // let recommendedConnections = document.createElement("p");
  // recommendedConnections.setAttribute("class", "recommendedConnections");
  // recommendedConnections.innerHTML = "View all recommended connections";

  // recommended.appendChild(recommendedConnections);
}

function createWhatsNew(newPost) {
  let opportunityRole = document.createElement("p");
  opportunityRole.innerHTML = "opportunityRole Role Role";
  opportunityRole.setAttribute("class", "heading3");
  opportunityRole.setAttribute("style", "font-weight: 700 !important;");

  let opportunityImgDiv = document.createElement("div");
  opportunityImgDiv.setAttribute("class", "bulletinboardpicture");
  opportunityImgDiv.setAttribute("style", "padding-bottom: 10px");

  let opportunityImg = document.createElement("img");
  opportunityImg.src = "./images/placeholder.jpg";
  opportunityImgDiv.appendChild(opportunityImg);

  let opportunityLocation = document.createElement("p");
  opportunityLocation.innerHTML = "opportunityLocation";
  opportunityLocation.setAttribute("class", "bodytext");

  let opportunityDiv = document.createElement("div");
  opportunityDiv.setAttribute("class", "opportunity");
  opportunityDiv.setAttribute("style", "margin-bottom: 10px;");
  opportunityDiv.appendChild(opportunityImgDiv);
  opportunityDiv.appendChild(opportunityRole);
  opportunityDiv.appendChild(opportunityLocation);

  newPost.appendChild(opportunityDiv);
}


view_profile("marlon");