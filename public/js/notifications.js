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
  measurementId: "G-VTZ4TEWFBW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


  
const db = firebase.firestore();

const BASE_URL = "https://marlonfajardo.ca/karma/v1";

let info = {};
get_firebase_info();

function get_firebase_info() {
  let info = {};
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        info['fullName'] = user.fullName;
        info['email'] = user.email;
        info['username'] = user.username; 
        view_notifications(info.username);
        loadRecommendedConnections(info.username);
      })
      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
}

const notification_types = {
  social_posts: generatePostNotification,
  opportunities: generateOpportunityNotification,
  "profile_follows request": generateNotificationFollowRequest,
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
  const endpoint = "/notifications";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;
  APIRequest(method, url, loadNotifications);
}

function loadNotifications(notis) {
  console.log(notis);
  for (let i = 0; i < notis.length; i++) {
    // for each notification
    let currentEvent = notis[i].type_of_event;
    notification_types[currentEvent](notis[i]);
    if (i != notis.length - 1) {
      generateHR();
    }
  }
}

function APIRequest(method, url, callback) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText;
        try {
          response = JSON.parse(response);
        } finally {
          callback(response);
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

  APIRequest(method, url, console.log);
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

  // generateNoNotifications();
  // let test = [
  //     {
  //       notification_id: 50,
  //       profile_id: 1,
  //       username_of_notification: "testuser",
  //       profile_pic_url: "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png",
  //       post_pic_url: null,
  //       message: " has requested to follow you.",
  //       type_of_event: "profile_follows request",
  //       id_of_event: 16,
  //       timestamp: "2021-05-22T21:21:51.000Z"
  //     },
  //     {
  //       notification_id: 41,
  //       profile_id: 1,
  //       username_of_notification: "Karma",
  //       profile_pic_url: "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
  //       post_pic_url: null,
  //       message: " is now following you.",
  //       type_of_event: "profile_follows accepted",
  //       id_of_event: 12,
  //       timestamp: "2021-05-13T17:36:19.000Z"
  //     },
  //     {
  //       notification_id: 25,
  //       profile_id: 1,
  //       username_of_notification: "Team Karma",
  //       profile_pic_url: "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
  //       post_pic_url: "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png",
  //       message: " has reviewed your application. Click here to see results",
  //       type_of_event: "opportunities",
  //       id_of_event: 3,
  //       timestamp: "2021-05-12T20:24:40.000Z"
  //     },
  //     {
  //       notification_id: 4,
  //       profile_id: 1,
  //       username_of_notification: "Karma",
  //       profile_pic_url: "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
  //       post_pic_url: "https://images.prismic.io/bcplace/4bb395e33a509c8e65e897a1b51988a6e739b072_vancouver_sun_run.jpg",
  //       message: " has liked your post.",
  //       type_of_event: "social_posts",
  //       id_of_event: 2,
  //       timestamp: "2021-05-12T06:01:37.000Z"
  //     },
  //     {
  //       notification_id: 2,
  //       profile_id: 1,
  //       username_of_notification: "Karma",
  //       profile_pic_url: "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
  //       post_pic_url: "https://www.citynews1130.com/wp-content/blogs.dir/sites/9/2019/04/21/church.jpg",
  //       message: " has liked your post.",
  //       type_of_event: "social_posts",
  //       id_of_event: 1,
  //       timestamp: "2021-05-12T05:52:02.000Z"
  //     }
  //   ];
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
  notificationConfirmButton.id = postObj.notification_id;
  notificationConfirmButton.innerHTML = "<i class='fas fa-check-circle'></i>";

  $("").click(function () {
  let userID = notificationConfirmButton.value;
  let follower = notificationConfirmButton.value;
  accept_request(userID, follower);
});

  let notificationDeleteButton = document.createElement("button");
  notificationDeleteButton.id = postObj.notification_id;
  notificationDeleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
  followDiv.appendChild(notificationConfirmButton);
  deleteDiv.appendChild(notificationDeleteButton);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(followDiv);
  notificationDiv.appendChild(deleteDiv);

  notificationsDiv.appendChild(notificationDiv);
}

// $("").click(function () {
//   let userID = followDiv.value;
//   let follower = followDiv.value;
//   accept_request(userID, follower);
// });

// $("").click(function () {
//   let userID = followDiv.value;
//   let follower = followDiv.value;
//   request_follow(userID, follower);
// });