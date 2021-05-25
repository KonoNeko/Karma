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

const BASE_URL = "https://marlonfajardo.ca/karma/v1";

const categories = {
  "Recommended For You": "recommended",
  "Fine Arts and Culture": "fine-arts",
  "Computers and Information Technology": "computers",
  "Environment": "environment",
  "Health and Wellness": "health",
  "Literacy, Libraries, and Learning": "literacy",
  "Sports and Recreation": "sports"
};

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

function formatParams(params) {
  let string = "?";
  let keys = Object.keys(params);
  for(let i=0; i<keys.length; i++) {
    string += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.length - 1) {
      string += "&";
    }
  }
  console.log(string);
  return string;
}

function view_opportunities() {
  const method = "GET";
  const endpoint = "/opportunities";
  const params = "";
  const url = BASE_URL + endpoint + params;
  APIRequest(method, url, loadOpportunities); 
}

function send_application(oppObj) {
  let msg = document.getElementById("message" + oppObj.opportunity_id).value;
  let email = document.getElementById("email" + oppObj.opportunity_id).textContent;
  let phone = document.getElementById("phone" + oppObj.opportunity_id).value;

  if (email != "" && phone != "") {
    const params = formatParams({
      "id": info.username,
      "post": oppObj.opportunity_id,
      "msg": msg,
      "email": email,
      "phone": phone,
      "city": "Vancouver, British Columbia"
    });
    const method = "POST";
    const endpoint = "/opportunities/applications";
    const url = BASE_URL + endpoint + params
    APIRequest(method, url, console.log);
  } else {
    alert("Could not send application, some fields were left unfilled.")
  }
}


function APIRequest(method, url, callback) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
  }
}

function loadOpportunities(results) {
  let opportunities;
  try {
    opportunities = JSON.parse(results);
  } catch(err) {
    console.log(err.message);
    opportunities = results;
  }
  for (const category of Object.keys(categories)) {
    let categoryList = opportunities[category];
    for(const id of Object.keys(categoryList)) {
      loadOpportunity(category, categoryList[id]); 
    }
  }
}

function loadOpportunity(category, oppObj) {
  let categoryID = categories[category];
  // console.log(categoryID);
  let categoryDiv = document.getElementById(categoryID + "-opportunities");
  let categoryOuterDiv = document.getElementById(categoryID + "-category");
  categoryOuterDiv.style.display = "block";
  loadModal(oppObj);
  generateOpportunity(oppObj, categoryDiv);
}

function loadModal(oppObj) {
  if (document.getElementById("modal" + oppObj.opportunity_id)) {
    // Break out of function if it already exists
    return;
  }
  let modal = document.getElementById("modalOverlay");

  let content = document.createElement("div");
  content.id = "modal" + oppObj.opportunity_id;
  content.className = "modal-content";
  content.value = "posting";

  let img = document.createElement("div");
  img.className = "modal-column modal-img";
  img.style.backgroundImage = `url('${oppObj.image_url}')`;
  

  let textDiv = document.createElement("div");
  textDiv.className = "modal-column modal-text";
  textDiv.id = "textModal" + oppObj.opportunity_id;

  let close = document.createElement("span");
  let title = document.createElement("p");
  let location = document.createElement("p");
  let description = document.createElement("p");
  let btn = document.createElement("btn");

  close.id = "close" + oppObj.opportunity_id;
  title.id = "modalRole";
  location.id = "modalLocation";
  description.id = "modalDescription";
  btn.id = "modalButton";

  close.className = "close";
  title.className = "heading1";
  location.className = "heading2";
  description.className = "bodytext";
  btn.className = "applyBtn";
  
  close.innerHTML = "&times;";
  title.innerText = oppObj.title;
  location.innerText = "Posted By " + oppObj.employer;
  description.innerHTML = oppObj.description + "<br>" + oppObj.requirements;
  btn.innerText = "Apply to this opportunity";


  btn.onclick = () => {
    displayApplication(oppObj);
  };

  // close.onclick = function () {
  //   hideModal(oppObj.opportunity_id);
  // };

  // textDiv.appendChild(close);
  textDiv.appendChild(title);
  textDiv.appendChild(location);
  textDiv.appendChild(description);
  textDiv.appendChild(btn);

  content.appendChild(img);
  content.appendChild(textDiv);
  modal.appendChild(content);
}

function displayApplication(oppObj) {
  let content = document.getElementById("modal" + oppObj.opportunity_id);
  loadApplication(content, oppObj);
  document.getElementById("application" + oppObj.opportunity_id).style.display = "block";
  document.getElementById("textModal" + oppObj.opportunity_id).style.display = "none";

  document.getElementById("myModal").onclick = () => {
    document.getElementById("textModal" + oppObj.opportunity_id).style.display = "block";
    document.getElementById("application" + oppObj.opportunity_id).style.display = "none";
    hideModal(oppObj.opportunity_id);
  }
}

function loadApplication(content, oppObj) {
  let textModal = document.createElement("div");
  textModal.className = "modal-column modal-text applicationDiv";
  textModal.id = "application" + oppObj.opportunity_id;

  let title = document.createElement("p");
  let nameLabel = document.createElement("p");
  let nameText = document.createElement("p");
  let emailLabel = document.createElement("p");
  let emailText = document.createElement("p");
  let phoneLabel = document.createElement("p");
  let phoneText = document.createElement("input");
  let messageLabel = document.createElement("p");
  let messageText = document.createElement("textarea");
  let btn = document.createElement("btn");

  title.id = "modalRole";
  location.id = "modalLocation";
  btn.id = "modalButton";
  nameText.id = "name" + oppObj.opportunity_id;
  emailText.id = "email" + oppObj.opportunity_id;
  phoneText.id = "phone" + oppObj.opportunity_id;
  messageText.id = "message" + oppObj.opportunity_id;

  title.className = "heading1";
  location.className = "heading2";

  btn.className = "applyBtn";
  nameLabel.className = "applicationLabel";
  emailLabel.className = "applicationLabel";
  phoneLabel.className = "applicationLabel";
  messageLabel.className = "applicationLabel";
  nameText.className = "applicationText";
  emailText.className = "applicationText";
  phoneText.className = "applicationInput";
  messageText.className = "applicationTextArea";

  title.innerText = `Application for ${oppObj.title} with ${oppObj.employer}`;
  nameLabel.innerHTML = "Name";
  emailLabel.innerHTML = "Email";
  phoneLabel.type = "text";
  phoneLabel.innerHTML = "Phone Number";
  messageLabel.innerHTML = "Message";
  nameText.innerHTML = info.fullName;
  emailText.innerHTML = info.email;
  phoneText.placeholder = "(123) 456-7890";
  btn.innerText = "Send Application";

  btn.onclick = () => {
    send_application(oppObj);
  }
 
  textModal.appendChild(title);
  textModal.appendChild(nameLabel);
  textModal.appendChild(nameText);
  textModal.appendChild(emailLabel);
  textModal.appendChild(emailText);
  textModal.appendChild(phoneLabel);
  textModal.appendChild(phoneText);
  textModal.appendChild(messageLabel);
  textModal.appendChild(messageText);
  textModal.appendChild(btn);
  textModal.style.textAlign = "left";


  content.appendChild(textModal);
}

async function get_firebase_info() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        console.log(user);
        info.fullName = user.fullName;
        info.email = user.email;
        info.username = user.username;
        view_opportunities();
      })
      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
}

function displayModal(id) {
  var modal = document.getElementById("myModal");
  modal.onclick = function () {
    hideModal(id);
  }
  var content = document.getElementById("modal" + id);
  modal.style.display = "block";
  content.style.display = "flex";
}

function hideModal(id) {
  var modal = document.getElementById("myModal");
  modal.onclick = null;
  var content = document.getElementById("modal" + id);
  modal.style.display = "none";
  content.style.display = "none";
}

function generateOpportunity(oppObj, category) {
  let opportunityRole = document.createElement("p");
  opportunityRole.innerHTML = oppObj.title;
  opportunityRole.setAttribute("class", "heading3");
  opportunityRole.setAttribute("style", "font-weight: 700 !important;");

  let opportunityImgDiv = document.createElement("div");
  opportunityImgDiv.setAttribute("class", "bulletinboardpicture");
  opportunityImgDiv.setAttribute("style", "padding-bottom: 10px");

  let opportunityImg = document.createElement("img");
  opportunityImg.src = oppObj.image_url;
  opportunityImgDiv.appendChild(opportunityImg);

  let opportunityLocation = document.createElement("p");
  opportunityLocation.innerHTML = oppObj.employer;
  opportunityLocation.setAttribute("class", "bodytext");

  let opportunityDiv = document.createElement("div");
  opportunityDiv.setAttribute("class", "opportunity");
  opportunityDiv.setAttribute("style", "margin-bottom: 10px;");
  opportunityDiv.appendChild(opportunityImgDiv);
  opportunityDiv.appendChild(opportunityRole);
  opportunityDiv.appendChild(opportunityLocation);

  category.appendChild(opportunityDiv);

  opportunityDiv.onclick = function () {
    displayModal(oppObj.opportunity_id);
  };
}
