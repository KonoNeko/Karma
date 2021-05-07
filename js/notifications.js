function loadAll() {
  generateTime();
  generatePostNotification();
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
}

function generatePostNotification() {
  let notificationsDiv = document.getElementById("notifications");

  let notificationDiv = document.createElement("div");
  notificationDiv.setAttribute("class", "notificationDiv");

  let notificationImgDiv = document.createElement("div");
  let notificationImg = document.createElement("img");
  notificationImgDiv.setAttribute("class", "profilepicture notificationImgDiv");
  notificationImg.src = "./images/placeholder2.png";

  let notificationText = document.createElement("div");
  notificationText.setAttribute("class", "notificationText");

  let notificationActionAuthor = document.createElement("p");
  let notificationAuthor = document.createElement("span");
  let notificationAction = document.createElement("span");
  let notificationTime = document.createElement("p");

  notificationText.setAttribute("style", "padding-left: 20px");
  notificationAuthor.setAttribute("class", "bodytitle");
  notificationAction.setAttribute("class", "bodytext");
  notificationTime.setAttribute("class", "smallbutton");

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
