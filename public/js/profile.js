
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA5oEJUCOc3V4zgGI9-wwMWmd-P6opmnWI",
  authDomain: "karma-535f3.firebaseapp.com",
  databaseURL: "https://karma-535f3-default-rtdb.firebaseio.com",
  projectId: "karma-535f3",
  storageBucket: "karma-535f3.appspot.com",
  messagingSenderId: "1023587584355",
  appId: "1:1023587584355:web:89bb521723bf4afd58eb56",
  measurementId: "G-VTZ4TEWFBW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const BASE_URL = "https://marlonfajardo.ca/karma/v1";

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
  APIRequest(method, url, loadProfile);
}

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
      } catch (err) {
        response = this.responseText;
      } finally {
        callback(response);
      }
    }
  };
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
        view_profile(info.username);
        loadRecommendedConnections(info.username);
        enableProfilePicBtn(info.username);
      })
      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
}

function add_Skills(userID, skill) {
  const method = "PUT";
  const endpoint = "/profiles/skills";
  const params = formatParams({
    id: userID,
    skill: skill,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, console.log);
}

function add_Education(userID, schoolName, description, gpa, start, end, img) {
  const method = "POST";
  const endpoint = "/profiles/education";
  const params = formatParams({
    id: userID,
    name: schoolName,
    type: description,
    gpa: gpa,
    start: start,
    end: end,
    img: img,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, console.log);
}

function add_Experience(userID, jobName, workplaceName, start, end, img) {
  const method = "POST";
  const endpoint = "/profiles/experience";
  const params = formatParams({
    id: userID,
    name: jobName,
    employer: workplaceName,
    start: start,
    end: end,
    img: img,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, console.log);
}

function add_Awards(userID, awardTitle, date, img) {
  const method = "POST";
  const endpoint = "/profiles/awardsAndCertifications";
  const params = formatParams({
    id: userID,
    title: awardTitle,
    date: date,
    img: img,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, console.log);
}

function add_Description(userID, bio) {
  const method = "POST";
  const endpoint = "/profiles/bio";
  const params = formatParams({
    id: userID,
    bio: bio,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, console.log);
}

function add_ProfilePic(username) {
  const method = "PUT";
  const endpoint = "/profiles/picture";
  const params = formatParams({
    id: username,
    picUrl: document.getElementById("mainProfilePic").textContent,
  });
  const url = BASE_URL + endpoint + params;
  APIRequest(method, url, (res) => {
    console.log(res);
    window.location.reload();
  });
}

function showProfile() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        document.getElementById("name").innerHTML = user.fullName;
        document.getElementById("username").innerHTML = "@" + user.username;
      })

      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
}

// WINDOW ONLOAD FUNCTION FOR THE PROFILE PAGE
function loadProfile(profileObj) {
  console.log(profileObj);
  console.log(height);
  document.getElementById("mainProfilePic").src =
    profileObj.info.profile_pic_url;
  loadAboutMe(profileObj);
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
  let skills = document.getElementById("skills-buttons");
  for (let key of Object.keys(profileObj.skills)) {
    createSkills(skills, profileObj.skills[key]);
    console.log(profileObj.skills[key]);
    console.log(key);
  }
}

function loadEducation(profileObj) {
  let education = document.getElementById("education-div");
  for (let key of Object.keys(profileObj.education)) {
    createEducation(education, profileObj.education[key]);
  }
}

function loadExperience(profileObj) {
  let experience = document.getElementById("experience-div");
  for (let key of Object.keys(profileObj.experience)) {
    createExperience(experience, profileObj.experience[key]);
  }
}

function loadAwards(profileObj) {
  let awards = document.getElementById("awards-div");
  for (let key of Object.keys(profileObj.certifications)) {
    createAwards(awards, profileObj.certifications[key]);
  }
}

function loadProfilepic(profileObj) {
  let profilepic = document.getElementById("profile");
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

function addAboutMe() {
  console.log("Add about me button clicked");

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
let posted = false;
function addProfilePic() {
  console.log("Add pic button clicked");

  const uploadFileButton = document.getElementById("file-upload");
  uploadFileButton.addEventListener("change", (ev) => {
    const formdata = new FormData();
    formdata.append("image", ev.target.files[0]);
    fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers: {
        Authorization: "Client-ID 4409588f10776f7",
      },
      body: formdata,
    })
      .then((data) => data.json())
      .then((data) => {
        posted = true;
        document.getElementById("mainProfilePic").innerText = data.data.link;
      });
  });
}
  function enableProfilePicBtn(username){
  document.getElementById("postBtn").onclick = () => {
    let link = document.getElementById("mainProfilePic").textContent;
    if (link != "" && posted && JSON.stringify(info) != "{}") {
      console.log("Posting");
      add_ProfilePic(username)
    } else if (!posted) {
      window.alert("Please wait for image to finish uploading");
    } else if (JSON.stringify(info) === "{}") {
      window.alert(
        "It doesn't look like you are signed in redirecting you now."
      );
      window.location.href("sign-up.html");
    } else if (link === "") {
      window.alert("No image is uploaded");
    }
  };

  // $("#save").click(function () {
  //   let picUrl= addEducationInput1.value;
  //   add_ProfilePic(picUrl);

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

    add_Education(info.username, schoolName, description, gpa, start, end, img);
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
  heading1.setAttribute("class", "heading3 schoolName");
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
  heading1.setAttribute("class", "heading3 experienceName");
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
  para.setAttribute("class", "employerpara");
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
  heading1.setAttribute("class", "heading3 awardsName");
  heading1.setAttribute("style", "font-weight: bold");
  heading1.innerHTML = `${awardsObj.title}`;

  let experiencendiv = document.createElement("div");
  experiencendiv.setAttribute("class", "awards-post-div");

  let picturediv = document.createElement("div");
  picturediv.setAttribute("class", "postpreviewpicture");

  let experienceInfoDiv = document.createElement("div");

  let picture = document.createElement("img");
  picture.setAttribute("class", "awardspic");
  picture.src = "./images/awards.jpg";

  let para = document.createElement("p");
  para.setAttribute("class", "awardspara");
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

showProfile();
