// RECOMMENDED.JS STUFF // SIDEBAR STUFF ONLY // SIDEBAR STUFF ONLY // RECCOMMENDED.JS STUFF //
let firebase_info = {};

// function get_firebase_username() {
//   firebase.auth().onAuthStateChanged(function (user) {
//     return db.collection("users").doc(user.uid).get();
//   });
// }

function loadWhatsNew() {
  const method = "GET";
  const endpoint = "/opportunities";
  const params = "";
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, getOpportunites);
}

function loadRecommendedConnections(username) {
  firebase_info.username = username;
  const method = "GET";
  const endpoint = "/profiles/recommended";
  const params = `/${username}`;
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, getRecommendedUsers);
}

function formatParams(params) {
  let string = "?";
  let keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    string += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.length - 1) {
      string += "&";
    }
  }
  return string;
}

function request_follow(userID, follower) {
  const method = "POST";
  const endpoint = "/profiles/followers";
  const params = formatParams({
    id: userID,
    follower: follower,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, console.log);
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

function getOpportunites(results) {
  results = results["Recommended For You"];
  for (let key of Object.keys(results)) {
    createWhatsNew(results[key]);
  }
}

function getRecommendedUsers(users) {
  for (let user of users) {
    createRecommendedConnections(user);
  }
}

function createWhatsNew(oppObj) {
  let whatsNewDiv = document.getElementById(
    "whats-new-volunteering-opportunities"
  );
  let opportunityRole = document.createElement("p");
  opportunityRole.innerHTML = oppObj.title;
  opportunityRole.setAttribute("class", "heading3");
  opportunityRole.setAttribute("style", "font-weight: 700 !important;");

  let opportunityImgDiv = document.createElement("div");
  opportunityImgDiv.setAttribute("class", "bulletinboardpicture");
  opportunityImgDiv.setAttribute("style", "padding-bottom: 10px");

  let opportunityImg = document.createElement("img");
  opportunityImg.src = oppObj.image_url;
  opportunityImgDiv.appendChild(opportunityImg);

  let opportunityLocation = document.createElement("p");
  opportunityLocation.innerHTML = oppObj.employer;
  opportunityLocation.setAttribute("class", "bodytext");

  let opportunityDiv = document.createElement("div");
  opportunityDiv.setAttribute("class", "opportunity");
  opportunityDiv.setAttribute("style", "margin-bottom: 10px;");
  opportunityDiv.appendChild(opportunityImgDiv);
  opportunityDiv.appendChild(opportunityRole);
  opportunityDiv.appendChild(opportunityLocation);

  whatsNewDiv.appendChild(opportunityDiv);
}

function createRecommendedConnections(user) {
  let recommendedConnectionsDiv = document.getElementById("recommendedUserDiv");
  let hr = document.createElement("hr");

  let recommendedUserDiv = document.createElement("div");
  recommendedUserDiv.setAttribute("class", "recommendedUserDiv");

  let storyImgDiv = document.createElement("div");
  storyImgDiv.setAttribute("class", "profilepic storyImgDiv");
  storyImgDiv.setAttribute("style", "padding-bottom: 10px; width: 20%");
  storyImgDiv.setAttribute(
    "style",
    `background-image: url("${user.profile_pic_url}")`
  );

  let nameAndUserName = document.createElement("div");
  nameAndUserName.setAttribute("class", "name-and-userName");
  nameAndUserName.setAttribute("style", "width: 50%;");

  let userName = document.createElement("p");
  userName.setAttribute("class", "userNames");
  userName.innerHTML = user.full_name;

  let userNameAt = document.createElement("p");
  userNameAt.setAttribute("class", "userAt");
  userNameAt.innerHTML = `@<span id="recommendedUser${user.profile_id}">${user.username}</span>`;

  recommendedUserDiv.appendChild(storyImgDiv);
  nameAndUserName.appendChild(userName);
  nameAndUserName.appendChild(userNameAt);

  recommendedUserDiv.appendChild(nameAndUserName);

  let followUser = document.createElement("div");
  let followUserButton = document.createElement("button");

  followUserButton.onclick = () => {
    request_follow(user.username, firebase_info.username);
    followUserButton.style.color = "white";
    followUserButton.style.backgroundColor = "#a7b7be";
    followUserButton.style.border = "0";
    followUserButton.innerHTML = "REQUESTED";
    followUserButton.onclick = "";
  };

  followUserButton.innerHTML = "FOLLOW";
  followUserButton.setAttribute("class", "followUserButton");
  followUser.setAttribute("class", "followUser");
  followUser.setAttribute("style", "width: 40%");
  followUserButton.setAttribute("style", "width: 70%; min-width: 100px;");

  followUser.appendChild(followUserButton);

  recommendedUserDiv.appendChild(followUser);

  let heading2 = document.createElement("hr");
  heading2.setAttribute("style", "margin-top: 20px; margin-bottom: 20px;");

  recommendedConnectionsDiv.appendChild(recommendedUserDiv);
  recommendedUserDiv.setAttribute(
    "style",
    "margin-top: 10px; margin-bottom: 10px;"
  );
  recommendedConnectionsDiv.appendChild(heading2);
}
