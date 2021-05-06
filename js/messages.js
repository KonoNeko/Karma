function loadAll() {
  loadAllMessagers();
  loadAllMessages();
}

function loadAllMessagers() {
  generateMessager();
  generateLine();
  generateMessager();
  generateLine();
  generateMessager();
  generateLine();
  generateMessager();
  generateLine();
  generateMessager();
}

function loadAllMessages() {
  generateMessages();
}

function generateMessager() {
  let mainMessagesDiv = document.getElementById("messages");

  let messagerDiv = document.createElement("div");
  messagerDiv.setAttribute("style", "padding: 10px");
  messagerDiv.setAttribute("class", "main-messages");

  let messagerImgDiv = document.createElement("div");
  let messagerImg = document.createElement("img");
  messagerImgDiv.setAttribute("class", "profilepicture messagerImgDiv");
  messagerImg.src = "./images/placeholder2.png";

  let messagerText = document.createElement("div");
  let messagerAuthor = document.createElement("p");
  let messagerMessage = document.createElement("p");
  let messagerTime = document.createElement("p");

  messagerText.setAttribute("style", "padding-left: 20px");
  messagerText.setAttribute("class", "messagerText");
  messagerAuthor.setAttribute("class", "bodytitle");
  messagerMessage.setAttribute("class", "bodytext");
  messagerTime.setAttribute("class", "smallbutton");

  messagerAuthor.innerHTML = "Author Name";
  messagerMessage.innerHTML = "This is the text that was sent";
  messagerTime.innerHTML = "3 minutes ago";

  messagerImgDiv.appendChild(messagerImg);

  messagerDiv.appendChild(messagerImgDiv);
  messagerDiv.appendChild(messagerText);

  messagerText.appendChild(messagerAuthor);
  messagerText.appendChild(messagerMessage);
  messagerText.appendChild(messagerTime);

  mainMessagesDiv.appendChild(messagerDiv);
}

function generateMessages() {}

function generateLine() {
  let hr = document.createElement("hr");

  let mainMessagesDiv = document.getElementById("messages");
  mainMessagesDiv.appendChild(hr);
}
