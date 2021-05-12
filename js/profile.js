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
  let post = document.getElementById("posts");
  createPost(post);
}

function loadSkills() {
  let skills = document.getElementById("skills");
  createSkills(skills);
}

function loadEducation() {
  let education = document.getElementById("education");
  createEducation(education);
}

function loadExperience() {
  let experience = document.getElementById("experience");
  createExperience(experience);
}

function loadAwards() {
  let awards = document.getElementById("awards");
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

  let addEducationHeading = document.createElement("p");
  addEducationHeading.setAttribute("class", "heading3");
  addEducationHeading.innerHTML = "Add education";
  addEducationHeading.setAttribute("style", "text-align: left");

  let addEducationInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addEducationHeading);
  document.getElementById("button-content").appendChild(addEducationInput);
  
}

function addExperience() {
  console.log("Add experience button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addExperienceHeading = document.createElement("p");
  addExperienceHeading.setAttribute("class", "heading3");
  addExperienceHeading.innerHTML = "Add experience";
  addExperienceHeading.setAttribute("style", "text-align: left");

  let addExperienceInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addExperienceHeading);
  document.getElementById("button-content").appendChild(addExperienceInput);
}



function createAboutMe(aboutme) {
  let aboutdiv = document.createElement("div");
  aboutdiv.setAttribute("class", "aboutdiv");

  let about = document.createElement("p");
  about.setAttribute("class", "about");
  about.innerHTML = "Im Jason and ....";

  aboutdiv.appendChild(about);
  aboutme.appendChild(aboutdiv);

}

function createProfilePic(){

}
function createSkills(){


}
function createPost(){

}
function createEducation(education){


}
function createExperience(){


}


function createAwards(awards){

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