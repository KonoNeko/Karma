const BASE_URL = "https://marlonfajardo.ca/karma/v1";

const notification_types = {
  social_posts: generatePostNotification,
  opportunities: generateOpportunityNotification,
  "profile_follows requested": generateNotificationFollowRequest,
  "profile_follows accepted": generateNotificationFollow,
};

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

function view_notifications(userID) {
  const method = "GET";
  const endpoint = "/notifications/karma";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;
  let result = APIRequest(method, url);
  console.log(result);
}

function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let result = JSON.parse(this.responseText);
      console.log(result);
      console.log("loading post");
      for (let i = 0; i < result.length; i++) {
        // for each notification
        let currentEvent = result[i].type_of_event;
        notification_types[currentEvent](result[i]);
        if (i != result.length - 1) {
          generateHR();
        }
      }
    }
  };
}

function accept_request(userID, follower) {
  const method = "PUT";
  const endpoint = "/profiles/followers";
  const params = formatParams({
    id: userID,
    follower: follower,
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}

function request_follow(userID, follower) {
  const method = "POST";
  const endpoint = "/profiles/followers";
  const params = formatParams({
    id: userID,
    follower: follower,
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}

function loadAll() {
  loadWhatsNew();
  loadRecommendedConnections();

  // generateNoNotifications();
  test = [
    {
      username_of_notification: "Karma",
      profile_pic_url:
        "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
      post_pic_url: null,
      message: " is now following you.",
      type_of_event: "profile_follows accepted",
      id_of_event: 12,
      timestamp: "2021-05-19T02:30:55.000Z",
    },
    {
      username_of_notification: "Karma",
      profile_pic_url:
        "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
      post_pic_url: null,
      message: " has requested to follow you.",
      type_of_event: "profile_follows requested",
      id_of_event: 12,
      timestamp: "2021-05-14T17:36:19.000Z",
    },
    {
      username_of_notification: "Team Karma",
      profile_pic_url:
        "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
      post_pic_url:
        "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/images/library.jpeg",
      message: " has reviewed your application. Click here to see results",
      type_of_event: "opportunities",
      id_of_event: 12,
      timestamp: "2021-05-13T17:36:19.000Z",
    },
    {
      username_of_notification: "Karma",
      profile_pic_url:
        "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
      post_pic_url:
        "https://www.citynews1130.com/wp-content/blogs.dir/sites/9/2019/04/21/church.jpg",
      message: " has liked your post.",
      type_of_event: "social_posts",
      id_of_event: 12,
      timestamp: "2021-05-10T17:36:19.000Z",
    },
    {
      username_of_notification: "Karma",
      profile_pic_url:
        "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
      post_pic_url:
        "https://images.prismic.io/bcplace/4bb395e33a509c8e65e897a1b51988a6e739b072_vancouver_sun_run.jpg",
      message: " has commented on your post: Congrats...",
      type_of_event: "social_posts",
      id_of_event: 12,
      timestamp: "2021-05-10T17:36:19.000Z",
    },
  ];

  for (let i = 0; i < test.length; i++) {
    // for each notification
    let currentEvent = test[i].type_of_event;
    notification_types[currentEvent](test[i]);
    if (i != test.length - 1) {
      generateHR();
    }
  }
  // view_notifications('karma');
}

function generateNoNotifications() {
  let noNotificationsDiv = document.getElementById("notifications");

  let notification = document.createElement("p");
  notification.setAttribute("class", "heading3");
  notification.setAttribute("style", "font-weight: 700; margin-bottom: 10px;");
  notification.innerHTML =
    "You have no new notifications. Check back to see if there are any new notifications!";

  noNotificationsDiv.appendChild(notification);
}

// function generateTime() {
//   let notificationsDiv = document.getElementById("notifications");

//   let notificationTime = document.createElement("p");
//   notificationTime.setAttribute("class", "heading3");
//   notificationTime.setAttribute(
//     "style",
//     "font-weight: 700; margin-bottom: 10px;"
//   );
//   notificationTime.innerHTML = "Recent";

//   notificationsDiv.appendChild(notificationTime);
// }

function generateHR() {
  let hr = document.createElement("hr");
  document.getElementById("notifications").appendChild(hr);
  hr.setAttribute("style", "margin-bottom: 10px");
}

function generatePostNotification(postObj) {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");

  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = postObj.profile_pic_url;

  let notificationText = document.createElement("div");
  notificationText.setAttribute("class", "notificationText");

  let notificationActionAuthor = document.createElement("p");
  let notificationAuthor = document.createElement("span");
  let notificationAction = document.createElement("span");
  let notificationTime = document.createElement("p");

  notificationText.setAttribute("style", "padding-left: 20px; width: 100%;");
  notificationAuthor.setAttribute("class", "bodytitle");
  notificationAction.setAttribute("class", "bodytext");
  notificationTime.setAttribute("class", "smalltext");
  notificationTime.setAttribute("style", "padding-top: 5px");

  notificationAuthor.innerHTML = postObj.username_of_notification;
  notificationAction.innerHTML = postObj.message;
  notificationTime.innerHTML = formatTimestamp(postObj.timestamp);

  notificationText.appendChild(notificationActionAuthor);
  notificationText.appendChild(notificationTime);
  notificationActionAuthor.appendChild(notificationAuthor);
  notificationActionAuthor.appendChild(notificationAction);
  notificationImgDiv.appendChild(notificationImg);

  let notificationPostImgDiv = document.createElement("div");
  let notificationPostImg = document.createElement("img");
  notificationPostImgDiv.setAttribute(
    "class",
    "postpreviewpicture notificationPostImgDiv"
  );
  notificationPostImg.src = postObj.post_pic_url;

  notificationPostImgDiv.appendChild(notificationPostImg);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(notificationPostImgDiv);

  notificationsDiv.appendChild(notificationDiv);
}

function generateOpportunityNotification(postObj) {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");
  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = postObj.profile_pic_url;

  let notificationText = document.createElement("div");
  notificationText.setAttribute("class", "notificationText");

  let notificationActionAuthor = document.createElement("p");
  let notificationAuthor = document.createElement("span");
  let notificationAction = document.createElement("span");
  let notificationPoster = document.createElement("span");
  let notificationTime = document.createElement("p");

  notificationText.setAttribute("style", "padding-left: 20px; width: 100%;");
  notificationAuthor.setAttribute("class", "bodytitle");
  notificationPoster.setAttribute("class", "bodytitle");
  notificationAction.setAttribute("class", "bodytext");
  notificationTime.setAttribute("class", "smalltext");
  notificationTime.setAttribute("style", "padding-top: 5px");

  notificationAuthor.innerHTML = postObj.username_of_notification;
  notificationAction.innerHTML = postObj.message;
  notificationTime.innerHTML = formatTimestamp(postObj.timestamp);

  notificationText.appendChild(notificationActionAuthor);
  notificationText.appendChild(notificationTime);

  notificationActionAuthor.appendChild(notificationAuthor);
  notificationActionAuthor.appendChild(notificationAction);
  notificationActionAuthor.appendChild(notificationPoster);

  notificationImgDiv.appendChild(notificationImg);

  let notificationPostImgDiv = document.createElement("div");
  let notificationPostImg = document.createElement("img");
  notificationPostImgDiv.setAttribute(
    "class",
    "postpreviewpicture notificationPostImgDiv"
  );
  notificationPostImg.src = postObj.post_pic_url;

  notificationPostImgDiv.appendChild(notificationPostImg);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(notificationPostImgDiv);

  notificationsDiv.appendChild(notificationDiv);
}

function generateNotificationFollow(postObj) {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");
  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = postObj.profile_pic_url;

  let notificationText = document.createElement("div");
  notificationText.setAttribute("class", "notificationText");

  let notificationActionAuthor = document.createElement("p");
  let notificationAuthor = document.createElement("span");
  let notificationAction = document.createElement("span");
  let notificationTime = document.createElement("p");

  notificationText.setAttribute("style", "padding-left: 20px; width: 100%;");
  notificationAuthor.setAttribute("class", "bodytitle");
  notificationAction.setAttribute("class", "bodytext");
  notificationTime.setAttribute("class", "smalltext");
  notificationTime.setAttribute("style", "padding-top: 5px");

  notificationAuthor.innerHTML = postObj.username_of_notification;
  notificationAction.innerHTML = postObj.message;
  notificationTime.innerHTML = formatTimestamp(postObj.timestamp);

  notificationText.appendChild(notificationActionAuthor);
  notificationText.appendChild(notificationTime);
  notificationActionAuthor.appendChild(notificationAuthor);
  notificationActionAuthor.appendChild(notificationAction);
  notificationImgDiv.appendChild(notificationImg);

  let followDiv = document.createElement("div");

  let notificationFollowButton = document.createElement("button");
  followDiv.setAttribute("class", "follow-btn");
  notificationFollowButton.innerHTML = "<i class='fas fa-user-plus'></i>";
  followDiv.appendChild(notificationFollowButton);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(followDiv);

  notificationsDiv.appendChild(notificationDiv);
}

function generateNotificationFollowRequest(postObj) {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");
  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = postObj.profile_pic_url;

  let notificationText = document.createElement("div");
  notificationText.setAttribute("class", "notificationText");
  let notificationActionAuthor = document.createElement("p");
  let notificationAuthor = document.createElement("span");
  let notificationAction = document.createElement("span");
  let notificationTime = document.createElement("p");

  notificationText.setAttribute(
    "style",
    "padding-left: 20px; width: 100%; margin-right: 20px;"
  );
  notificationAuthor.setAttribute("class", "bodytitle");
  notificationAction.setAttribute("class", "bodytext");
  notificationTime.setAttribute("class", "smalltext");
  notificationTime.setAttribute("style", "padding-top: 5px");

  notificationAuthor.innerHTML = postObj.username_of_notification;
  notificationAction.innerHTML = postObj.message;
  notificationTime.innerHTML = formatTimestamp(postObj.timestamp);

  notificationText.appendChild(notificationActionAuthor);
  notificationText.appendChild(notificationTime);
  notificationActionAuthor.appendChild(notificationAuthor);
  notificationActionAuthor.appendChild(notificationAction);
  notificationImgDiv.appendChild(notificationImg);

  let followDiv = document.createElement("div");
  followDiv.setAttribute("class", "follow-btn");

  let deleteDiv = document.createElement("div");
  deleteDiv.setAttribute("class", "delete-btn");

  let followI = document.createElement("i");
  followI.setAttribute("class", "fas fa-check-circle");

  let deleteI = document.createElement("i");
  deleteI.setAttribute("class", "fas fa-trash-alt");

  let notificationConfirmButton = document.createElement("button");
  notificationConfirmButton.innerHTML = "<i class='fas fa-check-circle'></i>";

  let notificationDeleteButton = document.createElement("button");
  notificationDeleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
  followDiv.appendChild(notificationConfirmButton);
  deleteDiv.appendChild(notificationDeleteButton);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(followDiv);
  notificationDiv.appendChild(deleteDiv);

  notificationsDiv.appendChild(notificationDiv);
}

$("").click(function () {
  let userID = followDiv.value;
  let follower = followDiv.value;
  accept_request(userID, follower);
});

$("").click(function () {
  let userID = followDiv.value;
  let follower = followDiv.value;
  request_follow(userID, follower);
});
