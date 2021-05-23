const BASE_URL = "https://marlonfajardo.ca/karma/v1";

let result = {
  "2021-05-21 00:55:01": {
    conversation_id: 2,
    other_user: "testuser",
    other_user_fullname: "test user",
    other_user_profile_pic:
      "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png",
    profile_pic:
      "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png",
    latest_message: "value",
    latest_message_timestamp: "2021-05-21 00:55:01",
    has_unread_messages: 1,
    messages: [
      {
        message_id: 6,
        sender: "marlon",
        message: "you a bum",
        message_timestamp: "2021-05-11T19:56:27.000Z",
      },
      {
        message_id: 8,
        sender: "marlon",
        message: "value",
        message_timestamp: "2021-05-19T21:42:31.000Z",
      },
      {
        message_id: 9,
        sender: "testuser",
        message: "value",
        message_timestamp: "2021-05-19T21:45:34.000Z",
      },
      {
        message_id: 10,
        sender: "testuser",
        message: "value",
        message_timestamp: "2021-05-21T04:48:24.000Z",
      },
      {
        message_id: 11,
        sender: "testuser",
        message: "value",
        message_timestamp: "2021-05-21T04:49:12.000Z",
      },
      {
        message_id: 12,
        sender: "testuser",
        message: "value",
        message_timestamp: "2021-05-21T04:55:00.000Z",
      },
      {
        message_id: 13,
        sender: "testuser",
        message: "value",
        message_timestamp: "2021-05-21T04:55:01.000Z",
      },
    ],
  },
  "2021-05-11 16:35:18": {
    conversation_id: 1,
    other_user: "Karma",
    other_user_fullname: "Team Karma",
    other_user_profile_pic:
      "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
    profile_pic:
      "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png",
    latest_message: "im chillin, wby bb?",
    latest_message_timestamp: "2021-05-11 16:35:18",
    has_unread_messages: 0,
    messages: [
      {
        message_id: 4,
        sender: "marlon",
        message: "heyyyy karma",
        message_timestamp: "2021-05-11T19:55:03.000Z",
      },
      {
        message_id: 5,
        sender: "Karma",
        message: "hey boo wyd",
        message_timestamp: "2021-05-11T19:55:58.000Z",
      },
      {
        message_id: 7,
        sender: "marlon",
        message: "im chillin, wby bb?",
        message_timestamp: "2021-05-11T20:35:18.000Z",
      },
    ],
  },
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

function view_messages(userID) {
  const method = "GET";
  const endpoint = "/messages";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;
  // APIRequest(method, url);
  if (JSON.stringify(result) === "{}") {
    generateNoMessages();
  }
  let keys = Object.keys(result);
  for (let i = 0; i < keys.length; i++) {
    generateMessager(result[keys[i]]);
    if (i != keys.length - 1) {
      generateLine();
    }
  }
}

function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // let result = JSON.parse(this.responseText);
      // console.log("loading post");
      // console.log(result);
      let keys = Object.keys(result);
      for (let i = 0; i < keys.length; i++) {
        generateMessager(result[keys[i]]);
        if (i != keys.length - 1) {
          generateLine();
        }
      }
    }
  };
}

function formatParams(params) {
  let string = "?";
  let keys = Object.keys(params);
  for(let i=0; i<keys.length; i++) {
    string += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.length - 1) {
      string += "&";
    }
  }
  return string;
}

function view_new_messages(userID) {
  const method = "POST";
  const endpoint = "/messages";
  const params = formatParams({
    "id": userID,
    "receiver": username,
    "msg": actualmessage
});

  const url = BASE_URL + endpoint + params;
  APIRequestSendMessages(method, url);
}


function APIRequestSendMessages(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // let result = JSON.parse(this.responseText);
      // console.log("loading post");
      // console.log(result);
      console.log("NICE DUDE!");
    }
  };
}

let width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

let height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

window.onresize = function () {
  // location.reload();
  width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
};

function loadAll() {
  // generateNoMessages();
  loadAllMessagers();
}

function loadAllMessagers() {
  // generateMessager();
  // generateLine();
  // generateMessager();
  // generateLine();
  // generateMessager();
  // generateLine();
  // generateMessager();
  // generateLine();
  // generateMessager();

  view_messages("marlon"); // Replace with firebase username
}

function loadAllMessages() {
  generateMessages();
  createMessageSentByOtherUser();
  createMessageSentByOtherUser();
  createMessageSentByYou();
}

function generateMessager(convo) {
  let mainMessagesDiv = document.getElementById("messages");

  let messagerDiv = document.createElement("div");
  messagerDiv.setAttribute("style", "padding: 10px");
  messagerDiv.setAttribute("class", "main-messages");

  let messagerImgDiv = document.createElement("div");
  let messagerImg = document.createElement("img");
  messagerImgDiv.setAttribute("class", "profilepicture messagerImgDiv");
  messagerImg.src = `${convo.other_user_profile_pic}`;

  let messagerText = document.createElement("div");
  let messagerAuthor = document.createElement("p");
  let messagerMessage = document.createElement("p");
  let messagerTime = document.createElement("p");

  messagerText.setAttribute("style", "padding-left: 20px");
  messagerText.setAttribute("class", "messagerText");
  messagerAuthor.setAttribute("class", "bodytitle");
  messagerMessage.setAttribute("class", "bodytext");
  messagerTime.setAttribute("class", "smallbutton");

  messagerAuthor.innerHTML = `${convo.other_user}`;
  messagerMessage.innerHTML = `${convo.latest_message}`;
  messagerTime.innerHTML = `${formatTimestamp(convo.latest_message_timestamp)}`;

  messagerImgDiv.appendChild(messagerImg);

  messagerDiv.appendChild(messagerImgDiv);
  messagerDiv.appendChild(messagerText);

  messagerText.appendChild(messagerAuthor);
  messagerText.appendChild(messagerMessage);
  messagerText.appendChild(messagerTime);

  messagerDiv.onclick = () => {
    revealMessages(convo);
  };

  mainMessagesDiv.appendChild(messagerDiv);
}

function returnToMessages() {
  document.getElementById("sidemain").setAttribute("style", "display: none");
  document
    .getElementById("mainmain")
    .setAttribute("style", "display: unset; width: 100%;");
}

function revealMessages(convo) {
  console.log(width);
  if (width > 600) {
    document.getElementById("messages-user-information").innerHTML = "";
    document.getElementById("messagesList").innerHTML = "";

    document.getElementById("mainmain").setAttribute("style", "width: 50%");
    document.getElementById("sidemain").setAttribute("style", "display: unset");
  } else {
    document.getElementById("messages-user-information").innerHTML = "";
    document.getElementById("messagesList").innerHTML = "";

    document.getElementById("mainmain").setAttribute("style", "display: none");
    document
      .getElementById("sidemain")
      .setAttribute("style", "display: unset; width: 100%;");
  }
  generateMessages(convo);
  let messageList = Object.keys(convo.messages);
  for (let i = 0; i < messageList.length; i++) {
    let currentMsg = convo.messages[messageList[i]];
    if (currentMsg.sender === convo.other_user) {
      createMessageSentByOtherUser(currentMsg, convo.other_user_profile_pic);
    } else {
      createMessageSentByYou(currentMsg, convo.profile_pic);
    }
  }
}

function generateMessages(msgObj) {
  let messagerInformationDiv = document.getElementById(
    "messages-user-information"
  );

  let messagerImgDiv = document.createElement("div");
  let messagerImg = document.createElement("img");
  let messagerName = document.createElement("p");
  let messagerUsername = document.createElement("p");

  messagerImgDiv.setAttribute("class", "smallMessagerImgDiv profilepicture");
  messagerImg.src = msgObj.other_user_profile_pic;
  messagerName.innerHTML = msgObj.other_user_fullname;
  messagerName.setAttribute("class", "bodytitle");
  messagerUsername.innerHTML = "@" + msgObj.other_user;
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

function createMessageSentByYou(currentMsg, profile_pic) {
  let messagesExpandedDiv = document.getElementById("messagesList");

  let messagesSentDiv = document.createElement("div");
  messagesSentDiv.setAttribute("class", "messagesSentByYouDiv");

  let messagesSentImgDiv = document.createElement("div");
  let messagesSentImg = document.createElement("img");
  messagesSentImg.src = profile_pic;
  messagesSentImgDiv.setAttribute(
    "class",
    "messagesSentByYouImgDiv profilepicture"
  );
  messagesSentImgDiv.appendChild(messagesSentImg);

  let messagesSentTextDiv = document.createElement("div");
  messagesSentTextDiv.setAttribute("class", "messagesSentByYouTextDiv");
  let messagesSentAuthor = document.createElement("p");
  let messagesSentText = document.createElement("div");
  let messagesSentTime = document.createElement("p");

  messagesSentAuthor.setAttribute("class", "bodytitle");
  messagesSentText.setAttribute(
    "class",
    "bodytext messagerText messagesSentByYouText"
  );
  messagesSentTime.setAttribute("class", "smalltext");

  messagesSentTextDiv.appendChild(messagesSentAuthor);
  messagesSentTextDiv.appendChild(messagesSentText);
  messagesSentTextDiv.appendChild(messagesSentTime);

  messagesSentAuthor.innerHTML = currentMsg.sender;
  messagesSentText.innerHTML = currentMsg.message;
  messagesSentTime.innerHTML = formatTimestamp(currentMsg.message_timestamp);

  messagesSentDiv.appendChild(messagesSentTextDiv);
  messagesSentDiv.appendChild(messagesSentImgDiv);
  messagesSentDiv.setAttribute("style", "padding-top: 10px");

  messagesExpandedDiv.appendChild(messagesSentDiv);
}

function createMessageSentByOtherUser(currentMsg, profile_pic) {
  let messagesExpandedDiv = document.getElementById("messagesList");

  let messagesSentDiv = document.createElement("div");
  messagesSentDiv.setAttribute("class", "messagesSentDiv");

  let messagesSentImgDiv = document.createElement("div");
  let messagesSentImg = document.createElement("img");
  messagesSentImg.src = profile_pic;
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

  messagesSentAuthor.innerHTML = currentMsg.sender;
  messagesSentText.innerHTML = currentMsg.message;
  // messagesSentText.innerHTML = "what is UP homeboys and homegirls and hometheys today we are going to be volunteering at Burnaby Park Secondary School. We're gonna hit up the gym to referee for their first boys's soccer game of the season. Stay tuned and make sure to like and subscribe for more content!";
  messagesSentTime.innerHTML = formatTimestamp(currentMsg.message_timestamp);

  messagesSentDiv.appendChild(messagesSentImgDiv);
  messagesSentDiv.appendChild(messagesSentTextDiv);

  messagesExpandedDiv.appendChild(messagesSentDiv);
}

function generateNoMessages() {
  document
    .getElementById("no-messages-div")
    .setAttribute("style", "display: unset");
  document.getElementById("mainmain").setAttribute("style", "display: none");
  document.getElementById("sidemain").setAttribute("style", "display: none");
}



function createSendMessage() {
  let userValue = document.getElementById("user-input").value;
  createMessageSentByYou(userValue);

}