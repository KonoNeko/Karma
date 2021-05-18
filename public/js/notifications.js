
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

function view_notifications(userID) {
  const method = "GET";
  const endpoint = "/notifications";
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
          console.log(result);
          console.log("loading post");
          for (let i=0; i<result.length; i++) { // for each notification
              // createPost(result[i]);
          }
          
      }
  }
}


function loadAll() {
  // generateNoNotifications();
  generateTime();
  generatePostNotification();
  generateHR();
  generatePostNotificationOtherUser();
  generateHR();
  generatePostNotificationFollowedYou();
  generateHR();
  generatePostNotificationFollowedYouRequest();
}


function generateNoNotifications() {
  let noNotificationsDiv = document.getElementById("notifications");

  let notification = document.createElement("p");
  notification.setAttribute("class", "heading3");
  notification.setAttribute(
    "style",
    "font-weight: 700; margin-bottom: 10px;"
  );
  notification.innerHTML = "You have no new notifications. Check back to see if there are any new notifications!";

  noNotificationsDiv.appendChild(notification);

}

function generateTime() {
  let notificationsDiv = document.getElementById("notifications");

  let notificationTime = document.createElement("p");
  notificationTime.setAttribute("class", "heading3");
  notificationTime.setAttribute(
    "style",
    "font-weight: 700; margin-bottom: 10px;"
  );
  notificationTime.innerHTML = "Recent";

  notificationsDiv.appendChild(notificationTime);
}

function generateHR() {
  let hr = document.createElement("hr");
  document.getElementById("notifications").appendChild(hr);
  hr.setAttribute("style", "margin-bottom: 10px");
}

function generatePostNotification() {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");
  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = "./images/placeholder.jpg";

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

  notificationAuthor.innerHTML = "williamblack" + " ";
  notificationAction.innerHTML = "has liked your comment";
  notificationTime.innerHTML = "3 minutes ago";

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
  notificationPostImg.src = "./images/placeholder2.png";

  notificationPostImgDiv.appendChild(notificationPostImg);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(notificationPostImgDiv);

  notificationsDiv.appendChild(notificationDiv);
}

function generatePostNotificationOtherUser() {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");
  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = "./images/placeholder.jpg";

  let notificationText = document.createElement("div");
  notificationText.setAttribute("class", "notificationText");

  let notificationActionAuthor = document.createElement("p");
  let notificationAuthor = document.createElement("span");
  let notificationAction = document.createElement("span");
  let notificationPoster = document.createElement("span");
  let notificationAction2 = document.createElement("span");
  let notificationTime = document.createElement("p");

  notificationText.setAttribute("style", "padding-left: 20px; width: 100%;");
  notificationAuthor.setAttribute("class", "bodytitle");
  notificationPoster.setAttribute("class", "bodytitle");
  notificationAction.setAttribute("class", "bodytext");
  notificationAction2.setAttribute("class", "bodytext");
  notificationTime.setAttribute("class", "smalltext");
  notificationTime.setAttribute("style", "padding-top: 5px");

  notificationAuthor.innerHTML = "williamblack" + " ";
  notificationAction.innerHTML = "has liked your comment on ";
  notificationPoster.innerHTML = "astrisfrost";
  notificationTime.innerHTML = "5 minutes ago";
  notificationAction2.innerHTML = "'s post";

  notificationText.appendChild(notificationActionAuthor);
  notificationText.appendChild(notificationTime);

  notificationActionAuthor.appendChild(notificationAuthor);
  notificationActionAuthor.appendChild(notificationAction);
  notificationActionAuthor.appendChild(notificationPoster);
  notificationActionAuthor.appendChild(notificationAction2);

  notificationImgDiv.appendChild(notificationImg);

  let notificationPostImgDiv = document.createElement("div");
  let notificationPostImg = document.createElement("img");
  notificationPostImgDiv.setAttribute(
    "class",
    "postpreviewpicture notificationPostImgDiv"
  );
  notificationPostImg.src = "./images/placeholder2.png";

  notificationPostImgDiv.appendChild(notificationPostImg);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(notificationPostImgDiv);

  notificationsDiv.appendChild(notificationDiv);
}

function generatePostNotificationFollowedYou() {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");
  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = "./images/placeholder.jpg";

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

  notificationAuthor.innerHTML = "williamblack" + " ";
  notificationAction.innerHTML = "has followed you";
  notificationTime.innerHTML = "3 minutes ago";

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

function generatePostNotificationFollowedYouRequest() {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");
  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = "./images/placeholder.jpg";

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

  notificationAuthor.innerHTML = "williamblack" + " ";
  notificationAction.innerHTML = "has requested to follow you";
  notificationTime.innerHTML = "3 minutes ago";

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

  notificationDeleteButton = document.createElement("button");
  notificationDeleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
  followDiv.appendChild(notificationConfirmButton);
  deleteDiv.appendChild(notificationDeleteButton);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(followDiv);
  notificationDiv.appendChild(deleteDiv);

  notificationsDiv.appendChild(notificationDiv);
}
