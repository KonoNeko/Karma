
const BASE_URL = "https://marlonfajardo.ca/karma/v1";

const result = [
  {
  "post_info": {
  "post_id": 1,
  "image_url": "https://www.citynews1130.com/wp-content/blogs.dir/sites/9/2019/04/21/church.jpg",
  "caption": "This is the church I used to volunteer at, St. Mary's Parish! Always a blast with all the people I volunteer with.",
  "location": "St. Mary's Parish",
  "post_date": "2021-05-03T21:29:36.000Z",
  "likes": 2,
  "username": "marlon",
  "profile_pic_url": "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png"
  },
  "comments": {
  "3": {
  "comment_id": 3,
  "post_id": 1,
  "user_id": 1,
  "comment": "Glad to see you active in your community!",
  "is_a_reply": 0,
  "id_of_comment_receiving_reply": null,
  "comment_date": "2021-05-11T06:52:31.000Z"
  },
  "totalComments": 1
  }
  },
  {
  "post_info": {
  "post_id": 2,
  "image_url": "https://images.prismic.io/bcplace/4bb395e33a509c8e65e897a1b51988a6e739b072_vancouver_sun_run.jpg",
  "caption": "Volunteering at the sun run was so fun! Can't wait until the day they are able to hold another!",
  "location": "BC Place",
  "post_date": "2021-05-04T01:06:34.000Z",
  "likes": 1,
  "username": "marlon",
  "profile_pic_url": "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png"
  },
  "comments": {
  "10": {
  "comment_id": 10,
  "post_id": 2,
  "user_id": 1,
  "comment": "We miss the sun run :(",
  "is_a_reply": 0,
  "id_of_comment_receiving_reply": null,
  "comment_date": "2021-05-13T05:23:39.000Z",
  "replies": {
  "14": {
  "comment_id": 14,
  "post_id": 2,
  "user_id": 1,
  "comment": "Yeah same",
  "is_a_reply": 1,
  "id_of_comment_receiving_reply": 10,
  "comment_date": "2021-05-13T06:07:11.000Z"
  }
  }
  },
  "totalComments": 2
  }
  },
  {
  "post_info": {
  "post_id": 4,
  "image_url": "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
  "caption": "Welcome to Karma! Use our platform share your experiences with volunteering, find opportunites near you, or network with other community members!",
  "location": "",
  "post_date": "2021-05-04T02:58:03.000Z",
  "likes": 1,
  "username": "Karma",
  "profile_pic_url": "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png"
  },
  "comments": {
  "totalComments": 0
  }
  }
];

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
  for (let i=0; i<result.length; i++) {
    createPost(result[i]);
  }
  // APIRequest(method, url); 
}


function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (result.length == 0) {
          // createBlankHomePage()
        }
        for (let i=0; i<result.length; i++) {
            createPost(result[i]);
        }
      }
  }
}


// WINDOW ONLOAD FUNCTION FOR THE HOME PAGE
function loadHome() {
  // loadStories();
  // loadWhatsNew();
  // loadRecommendedConnections();
  // view_social_feed('karma');
  // createBlankHomePage(); // This will show a blank homepage.
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


// CREATES A BLANK HOME PAGE.

// function createBlankHomePage() {
//   let blankHome = document.getElementById("posts");

//   let noPosts = document.createElement("p");
//   noPosts.setAttribute("class", "heading3");
//   noPosts.setAttribute(
//     "style",
//     "font-weight: 700; margin-bottom: 10px;"
//   );
//   noPosts.innerHTML = "You currently have no posts on your homepage feed. Connect with other users to see posts here!";

//   blankHome.appendChild(noPosts);

// }


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
  const posts = document.getElementById("posts");
  const post = document.createElement("div");
  post.className = "post";
  post.id = "post" + postObj.post_info.post_id;
  

  let topPartDiv = document.createElement("div");
  topPartDiv.setAttribute("class", "topPartDiv");

  let postImgDiv = document.createElement("div");
  postImgDiv.setAttribute("class", "profilepic topPartDivColumn topPartDivImg");
  postImgDiv.setAttribute("style", "padding-bottom: 10px");

  postImgDiv.setAttribute(
    "style",
    `background-image: url('${postObj["post_info"]["profile_pic_url"]}');
     background-color: #FFFFFF;`
  );

  let nameAndTimeDiv = document.createElement("div");
  nameAndTimeDiv.setAttribute("class", "name-and-time topPartDivColumn");

  let userName = document.createElement("p");
  userName.setAttribute("class", "userName");
  userName.innerHTML = postObj["post_info"]["username"];

  let dateObj = formatTimestamp(postObj["post_info"]["post_date"]);
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
    `background-image: url('${postObj["post_info"]["image_url"]}')`
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

  likes.innerHTML = `${postObj["post_info"]["likes"]} likes`;
  caption.innerHTML = `${postObj["post_info"]["caption"]}`;
  comments.innerHTML = `View all ${postObj.comments.totalComments} comments`;

  post.appendChild(likes);
  post.appendChild(caption);
  post.appendChild(comments);
  posts.appendChild(post);
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
}

function createModal(postID, placeholderImg) {
  let overlay = document.getElementById("modalOverlay");

  let modal = document.createElement("div");
  modal.className = "postModal";
  modal.id = "post" + postID;
  modal.style.display = "none";

  let leftSideDiv = document.createElement("div");
  leftSideDiv.id = "postPicture";
  leftSideDiv.className = "leftDiv";

  let rightSideDiv = document.createElement("div");
  rightSideDiv.id = "rightDiv";
  rightSideDiv.className = "rightDiv";

  let postDetails = document.createElement("div");
  postDetails.id = "postOwnerTitle";

  let profilePic = document.createElement("div");
  profilePic.id = "postOwnerProfilePic";
  profilePic.className = "profilepic";

  let nameAndTime = document.createElement("div");
  nameAndTime.id = "nameAndTimeDiv";

  let username = document.createElement("p");
  username.id = "postOwnerUsername";

  let time = document.createElement("p");
  time.id = "timePosted";
  
  nameAndTime.appendChild(username);
  nameAndTime.appendChild(time);

  postDetails.appendChild(profilePic);
  postDetails.appendChild(nameAndTime);
  rightSideDiv.appendChild(postDetails);


  rightSideDiv.appendChild(createLine());

  let commentList = document.createElement("div");
  commentList.id = "commentList";

  let captionDiv = loadCaption(placeholderImg, "Username", "This is a caption.");
  rightSideDiv.appendChild(captionDiv);
  rightSideDiv.appendChild(createLine());

  rightSideDiv.appendChild(commentList);
  rightSideDiv.appendChild(createLine());

  let interactionDiv = document.createElement("div");
  interactionDiv.id = "interactionDiv";

  let interactionButtons = document.createElement("div");
  interactionButtons.id = "interactionButtons";

  let likesLine = document.createElement("p");
  likesLine.innerHTML = `<span id="likeUsername"></span> and <span id="likes"></span> others like this post`;

  let commentForm = document.createElement("form");
  commentForm.className = "commentForm";
  
  let commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.placeholder = "Add a comment...";

  let commentSubmit = document.createElement("button");
  commentSubmit.type = "submit";
  commentSubmit.innerText = "Post";

  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentSubmit);

  interactionDiv.appendChild(interactionButtons);
  interactionDiv.appendChild(likesLine);
  interactionDiv.appendChild(commentForm);
  rightSideDiv.appendChild(interactionDiv);

  modal.appendChild(leftSideDiv);
  modal.appendChild(rightSideDiv);


  document.body.appendChild(modal);

  displayPost(placeholderImg);
  displayPostDetails("Username", "30 minutes ago", placeholderImg);
  displayComments(placeholderImg);
}

function hideModal(id) {
  document.getElementById("modalOverlay").style.display = "none";
  document.getElementById("post" + id).style.display = "none";
}

function displayModal(id) {
  document.getElementById("modalOverlay").style.display = "block";
  document.getElementById("modalOverlay").onclick = () => { hideModal(id) };
  document.getElementById("post" + id).style.display = "flex";
}


function displayPost(placeholderImg) {
  let postImage = document.getElementById("postPicture");
  postImage.setAttribute("style", `background-image: url('${placeholderImg}')`);
}

function displayPostDetails(username, time, placeholderImg) {
  let postOwnerTitle = document.getElementById("postOwnerTitle");

  let posterProfilePic = document.getElementById("postOwnerProfilePic");
  posterProfilePic.setAttribute("style", `background-image: url('${placeholderImg}')`);

  let nameAndTimeDiv = document.getElementById("nameAndTimeDiv");
  let userName = document.getElementById("postOwnerUsername");
  userName.innerHTML = username;
  let timePosted = document.getElementById("timePosted");
  timePosted.innerHTML = time;
  nameAndTimeDiv.appendChild(userName);
  nameAndTimeDiv.appendChild(timePosted);

  postOwnerTitle.appendChild(posterProfilePic);
  postOwnerTitle.appendChild(nameAndTimeDiv);
}


function createLine() {
  let line = document.createElement("hr");
  line.className = "comment-hr";
  return line;
}

function createComment(profilePic, username, comment, timestamp, commentID) {
  let commentDiv = document.createElement("div");
  commentDiv.className = "comment";
  commentDiv.id = commentID;

  let profilePicDiv = document.createElement("div");
  profilePicDiv.setAttribute("class", "profilepic");
  profilePicDiv.setAttribute("style", `background-image: url('${profilePic}')`);

  let commentBody = document.createElement("div");
  commentBody.className = "commentBody";

  let commentParagraph = createCommentParagraph(username, comment);

  let timeAndReply = document.createElement("div");
  let commentTime = document.createElement("span");
  commentTime.setAttribute("class", "timeAndReply");
  commentTime.innerHTML = timestamp;
  let replyButton = document.createElement("span");
  replyButton.setAttribute("class", "timeAndReply");
  replyButton.innerHTML = "Reply";
  replyButton.id = commentID;
  timeAndReply.appendChild(commentTime);
  timeAndReply.appendChild(replyButton);

  commentBody.appendChild(commentParagraph);
  commentBody.appendChild(timeAndReply);

  commentDiv.appendChild(profilePicDiv);
  commentDiv.appendChild(commentBody);

  return commentDiv;
}


function createCommentParagraph(username, comment) {
  let commentParagraph = document.createElement("p");
  let commentUserName = document.createElement("span");
  commentUserName.setAttribute("class", "commentUsername");
  commentUserName.innerHTML = username;

  let emptySpace = document.createElement("span");
  emptySpace.innerText = " ";

  let commentTxt = document.createElement("span");
  commentTxt.setAttribute("class", "commentTxt");
  commentTxt.innerHTML = comment;

  commentParagraph.appendChild(commentUserName);
  commentParagraph.appendChild(emptySpace);
  commentParagraph.appendChild(commentTxt);

  return commentParagraph;
}


function loadCaption(profilePic, username, caption) {
  let captionDiv = document.createElement("div");
  captionDiv.className = "comment";
  captionDiv.id = "caption";

  let captionImg = document.createElement("div");
  captionImg.setAttribute("class", "profilepic");
  captionImg.setAttribute("style", `background-image: url('${profilePic}')`);

  let captionParagraph = createCommentParagraph(username, caption);

  captionDiv.appendChild(captionImg);
  captionDiv.appendChild(captionParagraph);

  return captionDiv;
}


function displayComments(placeholderImg) {
  let commentsDiv = document.getElementById("commentList");


  // let captionDiv = loadCaption(placeholderImg, "Username", "This is a caption.");
  // commentsDiv.appendChild(captionDiv);
  // commentsDiv.appendChild(createLine());
  let comment1 = createComment(placeholderImg, "username", "This is a comment", "now", 1);
  let comment2 = createComment(placeholderImg, "username", "This is a comment", "5min", 2);
  let comment3 = createComment(placeholderImg, "username", "This is a comment", "10min", 3);
  let comment4 = createComment(placeholderImg, "username", "This is a comment", "15min", 4);
  let comment5 = createComment(placeholderImg, "username", "This is a comment", "20min", 5);
  let comment6 = createComment(placeholderImg, "username", "This is a comment", "20min", 6);
  let comment7 = createComment(placeholderImg, "username", "This is a comment", "20min", 7);
  let comment8 = createComment(placeholderImg, "username", "This is a comment", "20min", 8);

  
  
  commentsDiv.appendChild(comment1);
  commentsDiv.appendChild(comment2);
  commentsDiv.appendChild(comment3);
  commentsDiv.appendChild(comment4);
  commentsDiv.appendChild(comment5);
  commentsDiv.appendChild(comment6);
  commentsDiv.appendChild(comment7);
  commentsDiv.appendChild(comment8);
}

loadHome();