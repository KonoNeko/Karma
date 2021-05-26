const URL2 = " https://marlonfajardo.ca/karma/v1/post";
const method2 = "POST";
const endpoint = "/like";

console.log(done_viewing);

function like(id) {
  let heart = document.getElementById(id);
  let postId = id.slice(-1);

  console.log("YOU ARE NOW ALLOWED TO CLICK LIKE " + postId);

  // LIKE
  if (heart.className == "far fa-heart likeBtn") {
    heart.setAttribute(
      "style",
      "font-size: 24px; color: #B05A5F; margin-top: 10px; margin-bottom: 10px; margin-right:10px; "
    );
    heart.setAttribute("class", "fas fa-heart likeBtn");

    console.log("username: " + info.username);
    console.log("post id: " + postId);
    addLikes(info.username, postId);
    changeLikesText(postId, "add");
  }

  // UNLIKE
  else {
    heart.setAttribute(
      "style",
      "font-size: 24px; color: #214049; margin-top: 10px; margin-bottom: 10px; margin-right:10px; "
    );
    heart.setAttribute("class", "far fa-heart likeBtn");

    console.log("username: " + info.username);
    console.log("post id: " + postId);

    deleteLikes(info.username, postId);
    changeLikesText(postId, "subtract");
  }
}

function changeLikesText(id, mode) {
  let likesText = document.getElementById("likes" + id.slice(-1));
  let likesTextContent = likesText.textContent.slice(
    0,
    likesText.textContent.indexOf(" ")
  );

  let likesTextNumber =
    parseInt(likesTextContent, 10) + (mode == "add" ? 1 : -1);
  likesText.innerHTML =
    likesTextNumber != 1
      ? `${likesTextNumber} likes`
      : `${likesTextNumber} like`;
}

//@return list of users
async function getPost() {
  const URL_POSTS = " https://marlonfajardo.ca/karma/v1/posts/";
  let response = await fetch(URL_POSTS);
  let data = await response.json();
  console.log(data);
  return data;
}

function addLikes(id, post) {
  let params = formatParams({
    id: id,
    post: post,
  });

  let url = URL2 + endpoint + params;

  APIRequest(method2, url, console.log);
  console.log("likes" + post);
}

function deleteLikes(id, post) {
  let params = formatParams({
    id: id,
    post: post,
  });

  let methoddelete = "DELETE";

  let url = URL2 + endpoint + params;

  APIRequest(methoddelete, url, console.log);
}

function addComment(id, post, msg) {
  let params = formatParams({
    id: id,
    post: post,
    msg: msg,
  });

  let method = "POST";
  let commenturl = "https://marlonfajardo.ca/karma/v1/post/";
  let commentendpoint = "comment";

  let url = commenturl + commentendpoint + params;
  APIRequest(method, url, console.log);
}
