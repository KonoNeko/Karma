function load() {
  document.getElementById("opportunity-requirements").value = document
    .getElementById("opportunity-requirements")
    .value.trim();

  document.getElementById("opportunity-description").value = document
    .getElementById("opportunity-description")
    .value.trim();
}

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
  measurementId: "G-VTZ4TEWFBW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let info = {};
get_firebase_info();

const BASE_URL = "https://marlonfajardo.ca/karma/v1";

async function get_firebase_info() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        console.log(user);
        info.id = user.id;
        info.fullName = user.fullName;
        info.email = user.email;
        info.username = user.username;
      })
      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
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
  };
}

function formatParams(params) {
  let string = "?";
  let keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    string += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.length - 1) {
      string += "&";
    }
  }
  return string;
}

function addVolunteeringPost() {
  let id = info.id;
  let category = document.getElementById("opportunity-category").options[
    document.getElementById("opportunity-category").selectedIndex
  ].text;
  let date = document.getElementById("opportunity-start").value;
  let title = document.getElementById("opportunity-title").value.trim();
  let desc = document.getElementById("opportunity-description").value.trim();
  let requires = document
    .getElementById("opportunity-requirements")
    .value.trim();
  let img = document.getElementById("imageUrl").textContent;

  const method = "POST";
  const endpoint = "/opportunities";
  const params = formatParams({
    id: id,
    category: category,
    date: date,
    title: title,
    desc: desc,
    requires: requires,
    img: img,
  });
  const url = BASE_URL + endpoint + params;
  APIRequest(method, url, (res) => {
    console.log(res);
    window.location.reload();
  });
}

const uploadFileButton = document.getElementById(
  "file-upload"
);
let posted = false;

/*
Credit to Deepak K for following code snippet.
https://compile.blog/imgur-api-image-uploader/
*/
uploadFileButton.addEventListener("change", (ev) => {
  const formdata = new FormData();
  formdata.append("image", ev.target.files[0]);
  fetch("https://api.imgur.com/3/image/", {
    method: "post",
    headers: {
      Authorization: "Client-ID 4409588f10776f7",
    },
    body: formdata,
  })
    .then((data) => data.json())
    .then((data) => {
      posted = true;
      document.getElementById("imageUrl").innerText = data.data.link;
    });
});

document.getElementById("post-opportunity-btn").onclick = () => {
  let link = document.getElementById("imageUrl").textContent;
  if (link != "" && posted && JSON.stringify(info) != "{}") {
    console.log("Posting");
    addVolunteeringPost();
  } else if (!posted) {
    window.alert("Please wait for image to finish uploading");
  } else if (JSON.stringify(info) === "{}") {
    window.alert("It doesn't look like you are signed in redirecting you now.");
    window.location.href("sign-up.html");
  } else if (link === "") {
    window.alert("No image is uploaded");
  }
};
