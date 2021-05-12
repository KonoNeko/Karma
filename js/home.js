// WINDOW ONLOAD FUNCTION FOR THE HOME PAGE
function loadHome() {
  loadStories();
  loadWhatsNew();
  loadRecommendedConnections();
  loadPosts();
}

// READING INFORMATION FROM THE DATABASE
function loadStories() {
  let story = document.getElementById("stories");
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
  createStory(story);
}

function loadPosts() {
  let post = document.getElementById("posts");
  createPost(post);
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

// CREATE INDIVIDUAL UI ELEMENTS
function createStory(stories) {
  let storyImgDiv = document.createElement("div");
  storyImgDiv.setAttribute("class", "profilepic");
  storyImgDiv.setAttribute("style", "padding-bottom: 10px");

  storyImgDiv.setAttribute(
    "style",
    "background-image: url('./images/placeholder.jpg')"
  );

  let userName = document.createElement("p");
  userName.setAttribute("class", "userName");
  userName.innerHTML = "User name";

  let storyDiv = document.createElement("div");
  storyDiv.setAttribute("class", "story");
  storyDiv.appendChild(storyImgDiv);
  storyDiv.appendChild(userName);

  stories.appendChild(storyDiv);
}

function createPost(post) {
  let topPartDiv = document.createElement("div");
  topPartDiv.setAttribute("class", "topPartDiv");

  let postImgDiv = document.createElement("div");
  postImgDiv.setAttribute("class", "profilepic topPartDivColumn topPartDivImg");
  postImgDiv.setAttribute("style", "padding-bottom: 10px");

  postImgDiv.setAttribute(
    "style",
    "background-image: url('./images/placeholder.jpg')"
  );

  let nameAndTimeDiv = document.createElement("div");
  nameAndTimeDiv.setAttribute("class", "name-and-time topPartDivColumn");

  let userName = document.createElement("p");
  userName.setAttribute("class", "userName");
  userName.innerHTML = "User name";

  let timePosted = document.createElement("p");
  timePosted.setAttribute("class", "timePosted");
  timePosted.innerHTML = "30 minutes ago";

  nameAndTimeDiv.appendChild(userName);
  nameAndTimeDiv.appendChild(timePosted);

  topPartDiv.appendChild(postImgDiv);
  topPartDiv.appendChild(nameAndTimeDiv);

  post.appendChild(topPartDiv);

  let picture = document.createElement("div");
  picture.setAttribute("class", "postpicture");
  picture.setAttribute(
    "style",
    "background-image: url('./images/placeholder.jpg')"
  );
  post.appendChild(picture);

  let captionAndComments = document.createElement("div");
  captionAndComments.setAttribute("class", "captionAndComments");
  let likes = document.createElement("p");
  let caption = document.createElement("p");
  let comments = document.createElement("p");
  likes.setAttribute("class", "likes");
  caption.setAttribute("class", "caption");
  comments.setAttribute("class", "comments");

  likes.innerHTML = "williamblack and 103 others like this post";
  caption.innerHTML =
    "john.doe “The best way to find yourself is to lose yourself in the service of others.” - Mahatma Gandhi";
  comments.innerHTML = "View all 54 comments";

  post.appendChild(likes);
  post.appendChild(caption);
  post.appendChild(comments);
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

  // let mainDiv = document.createElement("div");
  // mainDiv.setAttribute("class", "mainDiv");

  // let firstDiv = document.createElement("div");
  // firstDiv.setAttribute("class", "postDiv");

  // let firstDivPicture = document.createElement("div");
  // firstDivPicture.setAttribute("class", "postpicture firstDivPicture");
  // firstDivImg = document.createElement("img");
  // firstDivImg.src = "./images/placeholder.jpg";
  // firstDivPicture.appendChild(firstDivImg);
  // newPost.appendChild(firstDivPicture);

  // let firstDivLocation = document.createElement("p");
  // firstDivLocation.setAttribute("class", "divLocation");
  // firstDivLocation.innerHTML = "Burnaby Library";
  // firstDiv.appendChild(firstDivLocation);

  // let firstDivPosition = document.createElement("p");
  // firstDivPosition.setAttribute("class", "divPosition");
  // firstDivPosition.innerHTML = "Languages Tutor";
  // firstDiv.appendChild(firstDivPosition);

  // let secondDiv = document.createElement("div");
  // secondDiv.setAttribute("class", "postDiv");

  // let secondDivPicture = document.createElement("div");
  // secondDivPicture.setAttribute("class", "postpicture");
  // secondDivPicture.setAttribute(
  //   "style",
  //   "background-image: url('./images/placeholder.jpg')"
  // );
  // newPost.appendChild(secondDivPicture);

  // let secondDivLocation = document.createElement("p");
  // secondDivLocation.setAttribute("class", "divLocation");
  // secondDivLocation.innerHTML = "Burnaby Library";
  // firstDiv.appendChild(secondDivLocation);

  // let secondDivPosition = document.createElement("p");
  // secondDivPosition.setAttribute("class", "divPosition");
  // secondDivPosition.innerHTML = "Languages Tutor";
  // secondDiv.appendChild(secondDivPosition);

  // let thirdDiv = document.createElement("div");
  // thirdDiv.setAttribute("class", "postDiv");

  // let thirdDivPicture = document.createElement("div");
  // thirdDivPicture.setAttribute("class", "postpicture");
  // thirdDivPicture.setAttribute(
  //   "style",
  //   "background-image: url('./images/placeholder.jpg')"
  // );
  // newPost.appendChild(thirdDivPicture);

  // let thirdDivLocation = document.createElement("p");
  // thirdDivLocation.setAttribute("class", "divLocation");
  // thirdDivLocation.innerHTML = "Burnaby Library";
  // thirdDiv.appendChild(thirdDivLocation);

  // let thirdDivPosition = document.createElement("p");
  // thirdDivPosition.setAttribute("class", "divPosition");
  // thirdDivPosition.innerHTML = "Languages Tutor";
  // thirdDiv.appendChild(thirdDivPosition);

  // mainDiv.appendChild(firstDiv);
  // mainDiv.appendChild(secondDiv);
  // mainDiv.appendChild(thirdDiv);

  // newPost.appendChild(mainDiv);
}
