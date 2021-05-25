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
        loadWhatsNew();
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
  "profile_follows accept": generateNotificationRequestAccpeted,
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

function loadAll() {
  loadWhatsNew();
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
  followDiv.appendChild(notificationFollowButton);

  notificationFollowButton.onclick = () => {
    let userID = postObj.username_of_notification;
    let follower = postObj.current_user;
    request_follow(userID, follower);
  }

  if (postObj.follow_status === "following") {
    notificationFollowButton.style.backgroundColor = "#51b09f";
    notificationFollowButton.innerHTML = "<i class='fas fa-user-check'></i>";
  } else if (postObj.follow_status === "requested") {
    notificationFollowButton.style.backgroundColor = "#6b7e86";
    notificationFollowButton.innerHTML = "<i class='fas fa-user-clock'></i>";
  } else {
    notificationFollowButton.style.backgroundColor = "#0367a6";
    notificationFollowButton.innerHTML = "<i class='fas fa-user-plus'></i>";
  }

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(followDiv);

  notificationsDiv.appendChild(notificationDiv);
}

function generateNotificationRequestAccpeted(postObj) {
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

  notificationConfirmButton.onclick = () => {
    let userID = postObj.current_user;
    let follower = postObj.username_of_notification;
    accept_request(userID, follower);
  }

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