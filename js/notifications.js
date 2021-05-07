function loadAll() {
  generateTime();
  generatePostNotification();
  generateHR();
  generatePostNotificationOtherUser();
  generateHR();
  generatePostNotificationFollowedYou();
  generateHR();
  generatePostNotificationFollowedYouRequest();
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

  notificationText.setAttribute("style", "padding-left: 20px; width: 80%;");
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

  notificationText.setAttribute("style", "padding-left: 20px; width: 80%;");
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

  notificationText.setAttribute("style", "padding-left: 20px; width: 80%;");
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
  notificationFollowButton.innerHTML = "Follow";
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
    "padding-left: 20px; width: 80%; margin-right: 20px;"
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

  let notificationConfirmButton = document.createElement("button");
  notificationConfirmButton.innerHTML = "Confirm";

  notificationDeleteButton = document.createElement("button");
  notificationDeleteButton.innerHTML = "Delete";
  followDiv.appendChild(notificationConfirmButton);
  deleteDiv.appendChild(notificationDeleteButton);

  notificationDiv.appendChild(notificationImgDiv);
  notificationDiv.appendChild(notificationText);
  notificationDiv.appendChild(followDiv);
  notificationDiv.appendChild(deleteDiv);

  notificationsDiv.appendChild(notificationDiv);
}
