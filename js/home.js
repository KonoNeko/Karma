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
  createWhatsNew();
}

function loadRecommendedConnections() {
  let recommendedUsers = document.getElementById("recommended-connections");
  createRecommendedConnection(recommendedUsers);
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

  let recommendedUserDiv = document.createElement("div");
  recommendedUserDiv.setAttribute("class", "recommendedUserDiv");

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

  let userNameAt = document.createElement("p");
  userNameAt.setAttribute("class", "user@");
  userNameAt.innerHTML = "@Username";


  recommendedUserDiv.appendChild(storyImgDiv);
  recommendedUserDiv.appendChild(userName);
  recommendedUserDiv.appendChild(userNameAt);

  recommended.appendChild(recommendedUserDiv);

  let recommendedConnections = document.createElement("p");
  recommendedConnections.setAttribute("class", "recommendedConnections");
  recommendedConnections.innerHTML = "View all recommended connections";

  recommended.appendChild(recommendedConnections);
}

function createWhatsNew() {}

