const URL2 = " https://marlonfajardo.ca/karma/v1/posts";

const method2 = "POST";

data = getPost();

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
    getPost().then((posts) => {
      console.log(posts);
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].post_info.post_id == postId) {
          posts[i].post_info.likes + 1;
        }
      }
    });
  }

  // UNLIKE
  else {
    heart.setAttribute(
      "style",
      "font-size: 24px; color: #214049; margin-top: 10px; margin-bottom: 10px; margin-right:10px; "
    );
    heart.setAttribute("class", "far fa-heart likeBtn");
  }
}

//@return list of users
async function getPost() {
  let response = await fetch(URL2);
  let data = await response.json();
  console.log(data);
  return data;
}

// function addLikes() {
//   getPost().then((posts) => {
//     let name = document.getElementById("userName");
//     for (let i = 0; i < posts.length; i++) {
//       // look for the entry with a matching `users` value
//       if (posts[i].username === name) {
//         console.log(posts[i].likes + 1);
//       }
//     }
//   });
// }
