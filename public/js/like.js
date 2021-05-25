const URL2 = " https://marlonfajardo.ca/karma/v1/post";
const method2 = "POST";
const endpoint = "/like";

function like(id) {
  let heart = document.getElementById(id);
  let postId = id.slice(-1);

  console.log(postId);

  // LIKE
  if (heart.className == "far fa-heart likeBtn") {
    heart.setAttribute(
      "style",
      "font-size: 24px; color: #B05A5F; margin-top: 10px; margin-bottom: 10px; margin-right:10px; "
    );
    heart.setAttribute("class", "fas fa-heart likeBtn");

    addLikes(info.username, postId);
  }

  // UNLIKE
  else {
    heart.setAttribute(
      "style",
      "font-size: 24px; color: #214049; margin-top: 10px; margin-bottom: 10px; margin-right:10px; "
    );
    heart.setAttribute("class", "far fa-heart likeBtn");
    deleteLikes();
  }
}

//@return list of users
async function getPost() {
  let response = await fetch(URL2);
  let data = await response.json();
  console.log(data);
  return data;
}

function addLikes(userID, postID) {
  let params = formatParams({
    id: userID,
    post: postID,
  });

  let url = URL2 + endpoint + params;

  APIRequest(method2, url, (res) => {
    console.log(res);
    window.location.reload();
  });
}

function deleteLikes() {}
