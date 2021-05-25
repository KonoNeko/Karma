const URL2 = " https://marlonfajardo.ca/karma/v1/posts";
const method2 = "POST";
const endpoint = "/likes";

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

function like(id) {
  let heart = document.getElementById(id);
  let postId = id.slice(-1);

  console.log(postId);

  // LIKE
  if (heart.className == "far fa-heart likeBtn") {
    heart.setAttribute(
      "style",
      "font-size: 24px; color: #B05A5F; margin-top: 10px; margin-bottom: 10px; margin-right:10px; "
    );
    heart.setAttribute("class", "fas fa-heart likeBtn");

    addLikes(info.username, postId);
  }

  // UNLIKE
  else {
    heart.setAttribute(
      "style",
      "font-size: 24px; color: #214049; margin-top: 10px; margin-bottom: 10px; margin-right:10px; "
    );
    heart.setAttribute("class", "far fa-heart likeBtn");
    deleteLikes();
  }
}

//@return list of users
async function getPost() {
  let response = await fetch(URL2);
  let data = await response.json();
  console.log(data);
  return data;
}

function addLikes(userID, postID) {
  let method = "POST";
  let endpoint = "/likes";
  let params = formatParams({
    id: userID,
    post: postID,
  });

  let url = BASE_URL2 + endpoint + params;

  APIRequest(method, url, (res) => {
    console.log(res);
    window.location.reload();
  });
}

function deleteLikes() {}
