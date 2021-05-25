let info;
get_firebase_info();

let width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

let height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

  window.onresize = function () {
    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  
    height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  };

function APIRequest(method, url, callback) {
    console.log(method + ": " + url);
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response;
        try {
            response = JSON.parse(this.responseText);
        } catch(err) {
            console.log(err.message);
            console.log()
            response = this.responseText;
        } finally {
            callback(response);
        }
      }
    };
}

function view_profile(userID, currentUser) {
    const method = "GET";
    const endpoint = "/profiles/other";
    const params = `/${userID}/${currentUser}`;
    const url = BASE_URL + endpoint + params;
    APIRequest(method, url, loadProfile);
}

function loadCurrentProfile(currentUsername) {
    let currentProfile = localStorage.getItem("profileUsername");
    console.log("Loading profile for " + currentProfile);
    view_profile(currentProfile, currentUsername);
}

function get_firebase_info() {
    let info = {};
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          let user = doc.data();
          info["fullName"] = user.fullName;
          info["email"] = user.email;
          info["username"] = user.username;
          loadRecommendedConnections(info.username);
          loadCurrentProfile(info.username);
        })
        .catch((error) => {
          console.log(`Error getting data: ${error}`);
        });
    });
}

function loadProfile(profileObj) {
    console.log(profileObj);
    console.log(height);
    loadAboutMe(profileObj);
    loadFollowButton(profileObj);
    loadPosts(profileObj);
    loadNumPosts(profileObj);
    loadSkills(profileObj);
    loadEducation(profileObj);
    loadExperience(profileObj);
    loadAwards(profileObj);
    loadProfilepic(profileObj);
    loadFollowers(profileObj);
    loadFollowing(profileObj);
    loadWhatsNew();
}

function loadFollowButton(profileObj) {
    let followBtn = document.getElementById('followbtn');
    if (profileObj.follow_status === "following") {
        followBtn.style.backgroundColor = "#51b09f";
        followBtn.innerHTML = "Following";
    } else if (profileObj.follow_status === "requested") {
        followBtn.style.backgroundColor = "#6b7e86";
        followBtn.innerHTML = "Requested";
    } else {
        followBtn.onclick = () => {
            //code for following
        }
    }
}

// READING INFORMATION FROM THE DATABASE
function loadAboutMe(profileObj) {
    let aboutme = document.getElementById("aboutme");
    createAboutMe(aboutme, profileObj);
}
  
function loadPosts(profileObj) {
    let posts = document.getElementById("posts");
    for (let key of profileObj.posts) {
      createPost(posts, key);
    }
}
  
function loadNumPosts(profileObj) {
    let numPosts = document.getElementById("numOfPosts");
    createNumPosts(numPosts, profileObj.info.posts);
}
  
function loadSkills(profileObj) {
    let skills = document.getElementById("skills");
    for (let key of Object.keys(profileObj.skills)) {
      createSkills(skills, profileObj.skills[key]);
      console.log(profileObj.skills[key]);
      console.log(key);
    }
}
  
function loadEducation(profileObj) {
    let education = document.getElementById("education");
    for (let key of Object.keys(profileObj.education)) {
      createEducation(education, profileObj.education[key]);
    }
}
  
function loadExperience(profileObj) {
    let experience = document.getElementById("experience");
    for (let key of Object.keys(profileObj.experience)) {
      createExperience(experience, profileObj.experience[key]);
    }
}
  
function loadAwards(profileObj) {
    let awards = document.getElementById("awards");
    for (let key of Object.keys(profileObj.certifications)) {
      createAwards(awards, profileObj.certifications[key]);
    }
}
  
function loadProfilepic(profileObj) {
    let profilepic = document.getElementById("mainProfilePic");
    createProfilePic(profilepic, profileObj);
}
  
function loadFollowing(profileObj) {
    let following = document.getElementById("numOfFollowing");
    createFollowing(following, profileObj);
}
  
function loadFollowers(profileObj) {
    let follower = document.getElementById("numOfFollowers");
    createFollowers(follower, profileObj);
}

function createNumPosts(numPosts, number) {
    numPosts.innerHTML = number;
}
  
function createAboutMe(aboutMe, aboutMeObj) {
    let aboutdiv = document.createElement("div");
    aboutdiv.setAttribute("class", "aboutdiv");
  
    let about = document.createElement("p");
    about.setAttribute("class", "about");
    about.setAttribute("id", "aboutMe-Profile");
    about.setAttribute("style", "margin-right: 20px;");
    about.innerHTML = `${aboutMeObj.info.bio}`;
  
    aboutdiv.appendChild(about);
    aboutMe.appendChild(aboutdiv);
}

function createProfilePic(profilePic, profileObj) {
    profilePic.src = profileObj.info.profile_pic_url;
}

function createSkills(skills, skillsObj) {
    let skillbtn = document.createElement("button");
    skillbtn.setAttribute("class", "skillsbtn");
    skillbtn.innerHTML = `${skillsObj.skill_title}`;
    console.log(skillsObj);
    // console.log(skillsObj.skill_title);
  
    skills.appendChild(skillbtn);
}

function createPost(posts, postsObj) {
    let postdiv = document.createElement("div");
    postdiv.setAttribute("class", "postdiv");
  
    let picture = document.createElement("img");
    picture.setAttribute("class", "postpic");
    picture.src = `${postsObj.post_info.image_url}`;
  
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

function createAwards(awards, awardsObj) {
    let heading1 = document.createElement("p");
    heading1.setAttribute("class", "heading3");
    heading1.setAttribute("style", "font-weight: bold");
    heading1.innerHTML = `${awardsObj.title}`;
  
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

function createFollowers(follower, followerObj) {
    follower.innerHTML = `${followerObj.info.followers}`;
}
  
function createFollowing(following, followingObj) {
    following.innerHTML = `${followingObj.info.followers}`;
}
