
const BASE_URL = "https://marlonfajardo.ca/karma/v1";

function formatTimestamp(timestamp) {
  let dateObj = new Date(Date.parse(timestamp));
  return returnHighestTimeDiff(dateObj);
}

function returnHighestTimeDiff(time) {
  let ms = {
    y: 31536000000,
    w: 604800000,
    d: 86400000,
    h: 3600000,
    m: 60000,
  }
  let diff = Date.now() - time;
  for(let [key, value] of Object.entries(ms)) {
      if (diff > value) {
          return `${Math.floor(diff/value)}${key}`;
      } else if (diff < ms.m) {
        return "Just now";
      }
  }
}

function view_social_feed(userID) {
  const method = "GET";
  const endpoint = "/posts";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;
  let result = APIRequest(method, url); 
}


function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          let result = JSON.parse(this.responseText)[0];
          console.log("loading post");
          for (let i=0; i<result.length; i++) {
              console.log(result);
              createPost(result[i]);
          }
          
      }
  }
}


// WINDOW ONLOAD FUNCTION FOR THE HOME PAGE
function loadHome() {
  loadStories();
  loadWhatsNew();
  loadRecommendedConnections();
  view_social_feed('karma');
//   loadPosts();
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
  // let id;
  // firebase.auth().onAuthStateChanged(function (user) {
  //   db.collection("users")
  //     .doc(user.uid)
  //     .get()
  //     .then(function (doc) {
  //       let user = doc.data();
  //       console.log(user.id);
  //       id = user.id;
  //     })
  //     .catch((error) => {
  //       console.log(`Error getting data: ${error}`);
  //     });
  // });
  view_social_feed('karma');
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
  recommendedUsers.appendChild(heading2);

  createRecommendedConnection(recommendedUsers);
  createRecommendedConnection(recommendedUsers);
  createRecommendedConnection(recommendedUsers);

  let viewAll = document.createElement("a");
  viewAll.id = "view-all";
  viewAll.innerHTML = "View all recommended connections";
  viewAll.setAttribute("style", "margin-top: 20px");
  // viewAll.setAttribute("href", ""); // YOU NEED SOMETHING IN HERE OR IT BREAKS THE CODE

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

function createPost(postObj) {
  const post = document.getElementById("posts");
  let topPartDiv = document.createElement("div");
  topPartDiv.setAttribute("class", "topPartDiv");

  let postImgDiv = document.createElement("div");
  postImgDiv.setAttribute("class", "profilepic topPartDivColumn topPartDivImg");
  postImgDiv.setAttribute("style", "padding-bottom: 10px");

  postImgDiv.setAttribute(
    "style",
    `background-image: url('${postObj["profile_pic_url"]}');
     background-color: #FFFFFF;`
  );

  let nameAndTimeDiv = document.createElement("div");
  nameAndTimeDiv.setAttribute("class", "name-and-time topPartDivColumn");

  let userName = document.createElement("p");
  userName.setAttribute("class", "userName");
  userName.innerHTML = postObj["username"];

  let dateObj = formatTimestamp(postObj["post_date"]);
  let timePosted = document.createElement("p");
  timePosted.setAttribute("class", "timePosted");
  timePosted.innerHTML = dateObj;

  nameAndTimeDiv.appendChild(userName);
  nameAndTimeDiv.appendChild(timePosted);

  topPartDiv.appendChild(postImgDiv);
  topPartDiv.appendChild(nameAndTimeDiv);
 
  post.appendChild(topPartDiv);

  let picture = document.createElement("div");
  picture.setAttribute("class", "postpicture");
  picture.setAttribute(
    "style",
    `background-image: url('${postObj["image_url"]}')`
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

  likes.innerHTML = `${postObj["likes"]} users like this post`;
  caption.innerHTML = `${postObj["caption"]}}`;
  comments.innerHTML = `View all ${postObj["comments"]} comments`;

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

  recommended.appendChild(recommendedUserDiv);
  recommendedUserDiv.setAttribute(
    "style",
    "margin-top: 10px; margin-bottom: 10px;"
  );
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

loadHome();