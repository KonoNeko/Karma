const BASE_URL = "https://marlonfajardo.ca/karma/v1";

function view_profile(userID) {
  const method = "GET";
  const endpoint = "/profile/karma";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;
  let result = APIRequest(method, url);
  console.log(result);
}

function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          let result = JSON.parse(this.responseText);
          console.log("loading post");
          console.log(result);
          for (let i=0; i<result.length; i++) {
              loadProfile(result[i]);
          }
          
      }
  }
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
function loadProfile() {
  loadAboutMe();
  loadPosts();
  loadNumPosts();
  loadSkills();
  loadEducation();
  loadExperience();
  loadAwards();
  loadProfilepic();
  loadFollowers();
  loadFollowing();
  loadWhatsNew();
  loadRecommendedConnections();
}

// READING INFORMATION FROM THE DATABASE
function loadAboutMe() {
  let aboutme = document.getElementById("aboutme");
  createAboutMe(aboutme);
}

function loadPosts() {
  let posts = document.getElementById("posts");
  createPost(posts);
  createPost(posts);
}

function loadNumPosts() {
  let numPosts = document.getElementById("numPosts");
  createNumPosts(numPosts)
}

function loadSkills() {
  let skills = document.getElementById("skills");
  createSkills(skills);
  createSkills(skills);
  createSkills(skills);
  createSkills(skills);
  createSkills(skills);
  createSkills(skills);
}

function loadEducation() {
  let education = document.getElementById("education");
  createEducation(education);
  createEducation(education);
}

function loadExperience() {
  let experience = document.getElementById("experience");
  createExperience(experience);
  createExperience(experience);
}

function loadAwards() {
  let awards = document.getElementById("awards");
  createAwards(awards);
  createAwards(awards);
}

function loadProfilepic() {
  let profilepic = document.getElementById("profile");
  createProfilePic(profilepic);
}

function loadFollowing() {
  let following = document.getElementById("following");
  createFollowing(following);
}

function loadFollowers() {
  let follower = document.getElementById("followers");
  createFollowers(follower);
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
}

function addEducation() {
  console.log("Add education button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addEducationHeading1 = document.createElement("p");
  addEducationHeading1.setAttribute("class", "heading3");
  addEducationHeading1.innerHTML = "Please enter the name of your school";
  addEducationHeading1.setAttribute("style", "text-align: left");

  let addEducationInput1 = document.createElement("textarea");
  addEducationInput1.setAttribute("style", "height: 50px");

  let addEducationHeading = document.createElement("p");
  addEducationHeading.setAttribute("class", "heading3");
  addEducationHeading.innerHTML = "Add education";
  addEducationHeading.setAttribute("style", "text-align: left");

  let addEducationInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addEducationHeading1);
  document.getElementById("button-content").appendChild(addEducationInput1);
  document.getElementById("button-content").appendChild(addEducationHeading);
  document.getElementById("button-content").appendChild(addEducationInput);
  
}

function addExperience() {
  console.log("Add experience button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addEducationHeading1 = document.createElement("p");
  addEducationHeading1.setAttribute("class", "heading3");
  addEducationHeading1.innerHTML = "Please enter the job title";
  addEducationHeading1.setAttribute("style", "text-align: left");

  let addEducationInput1 = document.createElement("textarea");
  addEducationInput1.setAttribute("style", "height: 50px");

  let addExperienceHeading = document.createElement("p");
  addExperienceHeading.setAttribute("class", "heading3");
  addExperienceHeading.innerHTML = "Add experience";
  addExperienceHeading.setAttribute("style", "text-align: left");

  let addExperienceInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addEducationHeading1);
  document.getElementById("button-content").appendChild(addEducationInput1);
  document.getElementById("button-content").appendChild(addExperienceHeading);
  document.getElementById("button-content").appendChild(addExperienceInput);
}

function createNumPosts(numPosts) {

  let post= document.createElement("p");
  post.setAttribute("class", "followers");
  post.innerHTML = "1";

  numPosts.appendChild(post);

}

function createAboutMe(aboutme) {
  let aboutdiv = document.createElement("div");
  aboutdiv.setAttribute("class", "aboutdiv");

  let about = document.createElement("p");
  about.setAttribute("class", "about");
  about.innerHTML = "I am a senior at Burnaby Mountain who is passionate about languages and fine arts. I like tutoring at my high school and working closely with youth. After graduation, I’d like to go to Simon Fraser University for a bachelor’s degree to major in Linguistics and possibly a minor in Interactive Arts and Technology!";

  aboutdiv.appendChild(about);
  aboutme.appendChild(aboutdiv);

}

function createProfilePic(profile){
  // let picture = document.createElement("img");
  // picture.setAttribute("class", "postpicture");
  // picture.setAttribute(
  //   "style",
  //   "background-image: url('./images/placeholder.jpg')"
  // );
  // profile.appendChild(picture);
}
function createSkills(skills){
  let skillbtn = document.createElement("button");
  skillbtn.setAttribute("class", "skillsbtn");
  skillbtn.innerHTML = "Leadership"

  skills.appendChild(skillbtn)



}
function createPost(posts){
  let postdiv = document.createElement("div");
  postdiv.setAttribute("class", "postdiv");

  let picture = document.createElement("img");
  picture.setAttribute("class", "postpic");
  picture.src = "./images/placeholder.jpg"

  postdiv.appendChild(picture)
  // picture.setAttribute(
  //   "style",
  //   "background-image: url('./images/placeholder.jpg')"
  // );
  posts.appendChild(postdiv);

}
function createEducation(education){
  let heading1 = document.createElement("h3")
  heading1.setAttribute("class", "schoolheading");
  heading1.innerHTML = "Burnaby Mountain Secondary School";


  let postdiv = document.createElement("div");
  postdiv.setAttribute("class", "postdiv");

  let picture = document.createElement("img");
  picture.setAttribute("class", "educationpic");
  picture.src = "./images/education.jpeg"

  let para= document.createElement("p");
  para.setAttribute("class", "schoolpara");
  para.innerHTML = "September 2016 to June 2021";

  postdiv.appendChild(picture);
  education.appendChild(heading1);
  education.appendChild(para);
  education.appendChild(postdiv);
  

}
function createExperience(experience){
  let heading1 = document.createElement("h3")
  heading1.setAttribute("class", "expheading");
  heading1.innerHTML = "Library assistant";


  let postdiv = document.createElement("div");
  postdiv.setAttribute("class", "postdiv");

  let picture = document.createElement("img");
  picture.setAttribute("class", "experiencepic");
  picture.src = "./images/experience.jpeg"

  let para= document.createElement("p");
  para.setAttribute("class", "exppara");
  para.innerHTML = "Archimedes Library, Newton";

  postdiv.appendChild(picture);
  experience.appendChild(heading1);
  experience.appendChild(para);
  experience.appendChild(postdiv);

}


function createAwards(awards){
  let heading1 = document.createElement("h3")
  heading1.setAttribute("class", "awardsheading");
  heading1.innerHTML = "District Authority Award in English Literature";


  let postdiv = document.createElement("div");
  postdiv.setAttribute("class", "postdiv");

  let picture = document.createElement("img");
  picture.setAttribute("class", "awardspic");
  picture.src = "./images/awards.jpg"

  let para= document.createElement("p");
  para.setAttribute("class", "awardspara");
  para.innerHTML = "Received July 2021";

  postdiv.appendChild(picture);
  awards.appendChild(heading1);
  awards.appendChild(para);
  awards.appendChild(postdiv);

}

function createFollowers(follower) {

  let follow= document.createElement("p");
  follow.setAttribute("class", "followers");
  follow.innerHTML = "150";



  follower.appendChild(follow);
}
function createFollowing(following){
  let follows= document.createElement("p");
  follows.setAttribute("class", "following");
  follows.innerHTML = "135";



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