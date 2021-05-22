// RECOMMENDED.JS STUFF // SIDEBAR STUFF ONLY // SIDEBAR STUFF ONLY // RECCOMMENDED.JS STUFF //
function loadWhatsNew() {
  let whatsNewDiv = document.getElementById(
    "whats-new-volunteering-opportunities"
  );

  createWhatsNew(whatsNewDiv);
  createWhatsNew(whatsNewDiv);
  createWhatsNew(whatsNewDiv);
}

function loadRecommendedConnections() {
  let recommendedConnectionsDiv = document.getElementById("recommendedUserDiv");

  let hr = document.createElement("hr");
  document.getElementById("recommendedUserDiv").appendChild(hr);
  hr.setAttribute("style", "margin-bottom: 20px");

  createRecommendedConnections(recommendedConnectionsDiv);
  createRecommendedConnections(recommendedConnectionsDiv);
  createRecommendedConnections(recommendedConnectionsDiv);
}

function createWhatsNew(whatsNewDiv) {
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

  whatsNewDiv.appendChild(opportunityDiv);
}

function createRecommendedConnections(recommendedConnectionsDiv) {
  let recommendedUserDiv = document.createElement("div");
  recommendedUserDiv.setAttribute("class", "recommendedUserDiv");

  let storyImgDiv = document.createElement("div");
  storyImgDiv.setAttribute("class", "profilepic storyImgDiv");
  storyImgDiv.setAttribute("style", "padding-bottom: 10px; width: 20%");
  storyImgDiv.setAttribute(
    "style",
    "background-image: url('./images/placeholder.jpg')"
  );

  let nameAndUserName = document.createElement("div");
  nameAndUserName.setAttribute("class", "name-and-userName");
  nameAndUserName.setAttribute("style", "width: 50%;");

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
  let followUserButton = document.createElement("button");

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
