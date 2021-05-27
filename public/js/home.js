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

let info = {};
let username;
get_firebase_info();

let done_viewing = false;

async function get_firebase_info() {
  firebase.auth().onAuthStateChanged(function (user) {
    return db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        console.log(user);
        info.fullName = user.fullName;
        username = user.username;
        info.email = user.email;
        info.username = user.username;
        view_social_feed(info.username);
        loadWhatsNew();
        loadRecommendedConnections(info.username);
      })
      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
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

function formatTimestamp(timestamp) {
  let dateObj = new Date(Date.parse(timestamp));
  return returnHighestTimeDiff(dateObj);
}

function returnHighestTimeDiff(time) {
  let ms = {
    year: 31536000000,
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
  };
  let diff = Date.now() - time;
  for (let [key, value] of Object.entries(ms)) {
    if (diff > value) {
      let time = Math.floor(diff / value);
      let result = `${time} ${key}`;
      result += time > 1 ? "s ago" : " ago";
      return result;
    } else if (diff < ms.minute) {
      return "Just now";
    }
  }
}

function view_social_feed(userID) {
  const method = "GET";
  const endpoint = "/posts";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;
  APIRequest(method, url, loopThroughSocialPosts);
  changeLikeIconForLikedPosts();

  done_viewing = true;
}

function loopThroughSocialPosts(results) {
  let posts;
  try {
    posts = JSON.parse(results);
  } catch (err) {
    console.log(err.message);
    posts = results;
  }
  console.log("This is being called" + posts.length);
  if (posts.length == 0) {
    createBlankHomePage();
  } else {
    for (let i = 0; i < posts.length; i++) {
      console.log(posts[i]);
      createPost(posts[i]);
    }
  }
}

function createNewPost() {
  const method = "POST";
  const endpoint = "/posts";
  const params = formatParams({
    id: info.username,
    img: document.getElementById("imageUrl").textContent,
    caption: document.getElementById("captionInput").value,
    location: document.getElementById("location").value,
  });
  const url = BASE_URL + endpoint + params;
  APIRequest(method, url, (res) => {
    console.log(res);
    window.location.reload();
  });
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

// WINDOW ONLOAD FUNCTION FOR THE HOME PAGE
// function loadHome() {
//   // loadWhatsNew();
//   // loadRecommendedConnections();
//   view_social_feed(info.username);

//   // createBlankHomePage(); // This will show a blank homepage.
// }

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

function loadRightSide() {
  loadWhatsNew();
}

// CREATE INDIVIDUAL UI ELEMENTS

function createBlankHomePage() {
  let blankHome = document.getElementById("posts");

  let noPostsImg = document.createElement("img");
  noPostsImg.src = "./res/home.svg";
  noPostsImg.setAttribute("style", "width: 100%;");

  let noPosts = document.createElement("p");
  noPosts.setAttribute("class", "heading4");
  noPosts.setAttribute(
    "style",
    "font-weight: 700; margin-bottom: 10px; color: #214049;"
  );
  noPosts.innerHTML =
    "You currently have no posts on your homepage feed. Connect with other users to see posts here!";

  blankHome.appendChild(noPostsImg);
  blankHome.appendChild(noPosts);
}

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
  createModal(postObj);
  const posts = document.getElementById("posts");
  const post = document.createElement("div");
  post.className = "post";
  post.id = "post" + postObj.post_info.post_id;

  let topPartDiv = document.createElement("div");
  topPartDiv.setAttribute("class", "topPartDiv");

  let postImgDiv = document.createElement("div");
  postImgDiv.setAttribute("class", "profilepic topPartDivColumn topPartDivImg");
  postImgDiv.setAttribute("style", "padding-bottom: 10px");

  postImgDiv.style.backgroundImage = `url('${postObj.post_info.profile_pic_url}')`;
  postImgDiv.style.backgroundColor = "#FFFFFF";

  let nameAndTimeDiv = document.createElement("div");
  nameAndTimeDiv.setAttribute("class", "name-and-time topPartDivColumn");

  let userName = document.createElement("p");
  userName.setAttribute("class", "userName bodytitle");
  userName.id = "userName" + postObj.post_info.post_id;
  userName.innerHTML = postObj.post_info.username;

  let dateObj = formatTimestamp(postObj.post_info.post_date);
  let timePosted = document.createElement("p");
  timePosted.setAttribute("class", "timePosted smalltext");
  timePosted.innerHTML = dateObj;

  nameAndTimeDiv.appendChild(userName);
  nameAndTimeDiv.appendChild(timePosted);
  nameAndTimeDiv.setAttribute("style", "margin-left: 10px");

  topPartDiv.appendChild(postImgDiv);
  topPartDiv.appendChild(nameAndTimeDiv);
  topPartDiv.setAttribute("style", "margin-bottom: 10px");

  post.appendChild(topPartDiv);

  let picture = document.createElement("div");
  picture.setAttribute("class", "postpicture");
  picture.setAttribute(
    "style",
    `background-image: url('${postObj.post_info.image_url}')`
  );
  picture.onclick = function () {
    displayModal(postObj.post_info.post_id);
  };
  post.appendChild(picture);

  let captionAndComments = document.createElement("div");
  captionAndComments.setAttribute("class", "captionAndComments");

  let likeIcon = document.createElement("i");
  likeIcon.setAttribute("class", "far fa-heart likeBtn");
  likeIcon.id = "likeBtn" + postObj.post_info.post_id;
  likeIcon.setAttribute(
    "style",
    "font-size: 24px; color: #214049; margin-right: 10px; margin-top: 10px; margin-bottom:"
  );
  likeIcon.onclick = function () {
    like(this.id);
  };
  console.log("LIKE BUTTON " + postObj.post_info.post_id + " CREATED");

  let commentIcon = document.createElement("i");
  commentIcon.setAttribute("class", "far fa-comment");
  commentIcon.setAttribute(
    "style",
    "font-size: 24px; color: #214049;  margin-right: 10px; margin-top: 10px; margin-bottom: 10px;"
  );
  commentIcon.onclick = function () {
    displayModal(postObj.post_info.post_id);
  };

  let shareIcon = document.createElement("i");
  shareIcon.setAttribute("class", "far fa-share-square");
  shareIcon.setAttribute(
    "style",
    "font-size: 24px; color: #214049; margin-top: 10px; margin-bottom: 10px;"
  );

  // let pic = document.createElement("img");
  // pic.setAttribute("src", "images/preheart.png");
  // pic.setAttribute("class", "likebtn");
  // pic.id = "preheart";
  // pic.setAttribute("onclick", "like()");

  let likes = document.createElement("p");
  let caption = document.createElement("p");
  let comments = document.createElement("p");
  likes.setAttribute("class", "likes bodytitle");
  likes.setAttribute("id", "likes" + postObj.post_info.post_id);
  caption.setAttribute("class", "caption");
  comments.setAttribute("class", "comments smalltext");
  comments.id = "comment-text" + postObj.post_info.post_id;
  comments.onclick = function () {
    displayModal(postObj.post_info.post_id);
  };
  let userSpan = document.createElement("span");
  userSpan.setAttribute("class", "bodytitle");
  userSpan.innerHTML = postObj.post_info.username + " ";

  let captionSpan = document.createElement("span");
  captionSpan.setAttribute("class", "bodytext");
  captionSpan.innerHTML = `${postObj.post_info.caption}`;

  likes.innerHTML =
    postObj.post_info.likes != 1
      ? `${postObj.post_info.likes} likes`
      : `${postObj.post_info.likes} like`;

  caption.appendChild(userSpan);
  caption.appendChild(captionSpan);
  comments.innerHTML = `View all ${postObj.comments.totalComments} comments`;

  post.appendChild(likeIcon);
  post.appendChild(commentIcon);
  post.appendChild(shareIcon);

  post.appendChild(likes);
  post.appendChild(caption);
  post.appendChild(comments);

  posts.appendChild(post);
}

function createModal(postObj) {
  let overlay = document.getElementById("modalOverlay");

  let post = postObj.post_info;
  let comments = postObj.comments;

  let modal = document.createElement("div");
  modal.className = "postModal";
  modal.id = "post" + post.post_id;
  modal.style.display = "none";

  let leftSideDiv = document.createElement("div");
  leftSideDiv.id = "postPicture" + post.post_id;
  leftSideDiv.className = "leftDiv";

  let rightSideDiv = document.createElement("div");
  rightSideDiv.id = "rightDiv" + post.post_id;
  rightSideDiv.className = "rightDiv";

  let postDetails = document.createElement("div");
  postDetails.id = "postOwnerTitle" + post.post_id;
  postDetails.className = "postOwnerTitle";

  let profilePic = document.createElement("div");
  profilePic.id = "postOwnerProfilePic" + post.post_id;
  profilePic.className = "profilepic";

  let nameAndTime = document.createElement("div");
  nameAndTime.id = "nameAndTimeDiv" + post.post_id;
  nameAndTime.className = "nameAndTimeDiv";

  let username = document.createElement("p");
  username.id = "postOwnerUsername" + post.post_id;

  let time = document.createElement("p");
  time.id = "timePosted" + post.post_id;

  nameAndTime.appendChild(username);
  nameAndTime.appendChild(time);

  postDetails.appendChild(profilePic);
  postDetails.appendChild(nameAndTime);
  rightSideDiv.appendChild(postDetails);

  let line = createLine();
  line.id = "lineAfterPostDetails";
  rightSideDiv.appendChild(line);

  let commentList = document.createElement("div");
  commentList.id = "commentList" + post.post_id;
  commentList.className = "commentList";

  let captionDiv = loadCaption(
    post.profile_pic_url,
    post.username,
    post.caption
  );
  rightSideDiv.appendChild(captionDiv);
  rightSideDiv.appendChild(createLine());

  rightSideDiv.appendChild(commentList);
  rightSideDiv.appendChild(createLine());

  let interactionDiv = document.createElement("div");
  interactionDiv.id = "interactionDiv" + post.post_id;

  let interactionButtons = document.createElement("div");
  interactionButtons.id = "interactionButtons" + post.post_id;

  let likesLine = document.createElement("p");
  likesLine.setAttribute("style", "margin-left: 10px;");
  likesLine.innerHTML =
    post.likes > 1
      ? `${post.likes} users like this`
      : `${post.likes} user likes this`;

  let commentForm = document.createElement("div");
  commentForm.className = "commentForm";

  let commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.setAttribute("style", "margin-left: 10px;");
  commentInput.setAttribute("class", "commetnInput");
  commentInput.placeholder = "Add a comment...";
  commentInput.setAttribute("id", "commentInput" + post.post_id);

  let commentSubmit = document.createElement("button");
  commentSubmit.setAttribute("style", "margin-left: 10px;");
  commentSubmit.type = "button";
  commentSubmit.setAttribute("class", "postBtn");
  commentSubmit.innerText = "Post";
  commentSubmit.setAttribute("id", "addCommentButton" + post.post_id);
  commentSubmit.onclick = function () {
    let id = info.username;
    let postpost = post.post_id;
    let message = document.getElementById("commentInput" + post.post_id).value;

    alert(
      "username: " +
        id +
        "\npost: " +
        postpost +
        "\nmessage: " +
        message +
        "\nAdding comment..."
    );

    addComment(id, postpost, message);
  };

  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentSubmit);

  interactionDiv.appendChild(interactionButtons);
  interactionDiv.appendChild(likesLine);
  interactionDiv.appendChild(commentForm);
  rightSideDiv.appendChild(interactionDiv);

  modal.appendChild(leftSideDiv);
  modal.appendChild(rightSideDiv);

  overlay.appendChild(modal);

  displayPost(post.image_url, post.post_id);
  displayPostDetails(
    post.username,
    formatTimestamp(post.post_date),
    post.profile_pic_url,
    post.post_id
  );
  displayComments(comments, post.post_id);
}

//@return list of users
async function getPostForOnlyUser() {
  const URL_POSTS = " https://marlonfajardo.ca/karma/v1/posts/" + info.username;
  let response = await fetch(URL_POSTS);
  let data = await response.json();
  return data;
}

function changeLikeIconForLikedPosts() {
  getPostForOnlyUser().then((posts) => {
    console.log(posts);

    for (i = 0; i < posts.length; i++) {
      if (posts[i].post_info.is_liked == 1) {
        let likedPostsLikeIconId = "likeBtn" + posts[i].post_info.post_id;
        let likedPostsLikeIcon = document.getElementById(likedPostsLikeIconId);

        console.log(likedPostsLikeIcon);
        console.log("likeBtn" + posts[i].post_info.post_id);

        likedPostsLikeIcon.setAttribute("class", "fas fa-heart likeBtn");
        likedPostsLikeIcon.setAttribute(
          "style",
          "font-size: 24px; color: #B05A5F; margin-top: 10px; margin-bottom: 10px; margin-right:10px; "
        );
      }
    }
  });
}

function hideModal(id) {
  document.getElementById("postModalBackground").style.display = "none";
  document.getElementById("post" + id).style.display = "none";
}

function displayModal(id) {
  document.getElementById("postModalBackground").style.display = "block";
  document.getElementById("postModalBackground").onclick = () => {
    hideModal(id);
  };
  document.getElementById("post" + id).style.display = "flex";
}

function displayPost(img, id) {
  let postImage = document.getElementById("postPicture" + id);
  postImage.style.backgroundImage = `url('${img}')`;
}

function displayPostDetails(username, time, img, id) {
  let postOwnerTitle = document.getElementById("postOwnerTitle" + id);

  let posterProfilePic = document.getElementById("postOwnerProfilePic" + id);
  posterProfilePic.style.backgroundImage = `url('${img}')`;

  let nameAndTimeDiv = document.getElementById("nameAndTimeDiv" + id);
  let userName = document.getElementById("postOwnerUsername" + id);
  userName.innerHTML = username;
  let timePosted = document.getElementById("timePosted" + id);
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
  commentParagraph.className = "commentParagraph";
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

function displayComments(comments, id) {
  let commentsDiv = document.getElementById("commentList" + id);
  if (JSON.stringify(comments) != "{}") {
    for (const id of Object.keys(comments)) {
      if (id != "totalComments") {
        let currentComment = createComment(
          comments[id].commenter_profile_pic,
          comments[id].comment_poster,
          comments[id].comment,
          formatTimestamp(comments[id].comment_date),
          id
        );
        commentsDiv.appendChild(currentComment);
      }
    }
  }
}

/*
Credit to Deepak K for following code snippet.
https://compile.blog/imgur-api-image-uploader/
*/

const uploadFileButton = document.getElementById("file-upload");
let posted = false;
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
      document.getElementById("imageUrl").innerText = data.data.link;
    });
});

document.getElementById("postBtn").onclick = () => {
  let link = document.getElementById("imageUrl").textContent;
  if (link != "" && posted && JSON.stringify(info) != "{}") {
    console.log("Posting");
    createNewPost();
  } else if (!posted) {
    window.alert("Please wait for image to finish uploading");
  } else if (JSON.stringify(info) === "{}") {
    window.alert("It doesn't look like you are signed in redirecting you now.");
    window.location.href("sign-up.html");
  } else if (link === "") {
    window.alert("No image is uploaded");
  }
};

// loadHome();
