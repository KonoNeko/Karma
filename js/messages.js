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
  createMessageSentByOtherUser();
  createMessageSentByOtherUser();
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

function generateMessages() {
  let messagerInformationDiv = document.getElementById(
    "messages-user-information"
  );

  let messagerImgDiv = document.createElement("div");
  let messagerImg = document.createElement("img");
  let messagerName = document.createElement("p");
  let messagerUsername = document.createElement("p");

  messagerImgDiv.setAttribute("class", "smallMessagerImgDiv profilepicture");
  messagerImg.src = "./images/placeholder1.png";
  messagerName.innerHTML = "name of messenger";
  messagerName.setAttribute("class", "bodytitle");
  messagerUsername.innerHTML = "@" + "messenger.username";
  messagerUsername.setAttribute("class", "bodytext");

  messagerImgDiv.appendChild(messagerImg);
  let messagerAuthorText = document.createElement("div");
  messagerAuthorText.appendChild(messagerName);
  messagerAuthorText.appendChild(messagerUsername);
  messagerAuthorText.setAttribute("class", "messagerText");
  messagerAuthorText.setAttribute("style", "padding-left: 10px");

  messagerInformationDiv.setAttribute("style", "padding-bottom: 20px");

  messagerInformationDiv.appendChild(messagerImgDiv);
  messagerInformationDiv.appendChild(messagerAuthorText);
}

function generateLine() {
  let hr = document.createElement("hr");

  let mainMessagesDiv = document.getElementById("messages");
  mainMessagesDiv.appendChild(hr);
}

function createMessageSentByYou() {}

function createMessageSentByOtherUser() {
  let messagesExpandedDiv = document.getElementById("messages-expanded");

  let messagesSentDiv = document.createElement("div");
  messagesSentDiv.setAttribute("class", "messagesSentDiv");

  let messagesSentImgDiv = document.createElement("div");
  let messagesSentImg = document.createElement("img");
  messagesSentImg.src = "./images/placeholder2.png";
  messagesSentImgDiv.setAttribute("class", "messagesSentImgDiv profilepicture");
  messagesSentImgDiv.appendChild(messagesSentImg);

  let messagesSentTextDiv = document.createElement("div");
  messagesSentTextDiv.setAttribute("class", "messagesSentTextDiv");
  let messagesSentAuthor = document.createElement("p");
  let messagesSentText = document.createElement("div");
  let messagesSentTime = document.createElement("p");

  messagesSentAuthor.setAttribute("class", "bodytitle");
  messagesSentText.setAttribute("class", "bodytext messagesSentText");
  messagesSentTime.setAttribute("class", "smalltext");

  messagesSentTextDiv.appendChild(messagesSentAuthor);
  messagesSentTextDiv.appendChild(messagesSentText);
  messagesSentTextDiv.appendChild(messagesSentTime);

  messagesSentAuthor.innerHTML = "williamblack";
  messagesSentText.innerHTML =
    "what is UP homeboys and homegirls and hometheys today we are going to be volunteering at Burnaby Park Secondary School. We're gonna hit up the gym to referee for their first boys's soccer game of the season. Stay tuned and make sure to like and subscribe for more content!";
  messagesSentTime.innerHTML = "7 minutes " + "ago";

  messagesSentDiv.appendChild(messagesSentImgDiv);
  messagesSentDiv.appendChild(messagesSentTextDiv);

  messagesExpandedDiv.appendChild(messagesSentDiv);
}
