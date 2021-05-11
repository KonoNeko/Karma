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


function loadWhatsNew() {
  createWhatsNew();
}

function loadRecommendedConnections() {
  createRecommendedConnection();
}

function loadPosts() {
  createPost();
}

// CREATE INDIVIDUAL UI ELEMENTS
function createStory(stories) {

  let storyImgDiv = document.createElement("div");
  storyImgDiv.setAttribute("class", "profilepic");
  storyImgDiv.setAttribute("style", "padding-bottom: 10px");

  storyImgDiv.setAttribute("style", "background-image: url('./images/placeholder.jpg')");

  let userName = document.createElement("p");
  userName.setAttribute("class", "userName")
  userName.innerHTML = "User name";

  let storyDiv = document.createElement("div");
  storyDiv.setAttribute("class", "story");
  storyDiv.appendChild(storyImgDiv);
  storyDiv.appendChild(userName);
  
  stories.appendChild(storyDiv);

}

function createWhatsNew() {}

function createRecommendedConnection() {}

function createPost() {}
