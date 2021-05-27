/* ALL FRONTEND CREATING ELEMENTS PROGRAMMATICALLY WITH JAVASCRIPT */
function createUserSearch(user) {
  console.log("USER SEARCH???");
  //CREATE ELEMENTS
  let searchResultsDiv = document.getElementById("search-results");

  let searchResultUserDiv = document.createElement("div");

  let searchResultsImgDiv = document.createElement("div");

  let searchResultsImg = document.createElement("img");

  let searchResultsTextDiv = document.createElement("div");
  let searchResultsName = document.createElement("p");
  let searchResultsUserAt = document.createElement("p");
  let searchResultsIsVolunteer = document.createElement("p");

  let viewProfileButtonDiv = document.createElement("div");
  let viewProfileButton = document.createElement("button");

  // ASSIGN ATTRIBUTES
  searchResultUserDiv.setAttribute("class", "searchResultUserDiv");

  searchResultsImgDiv.setAttribute("class", "profilePic searchResultsImgDiv");
  searchResultsImgDiv.setAttribute(
    "style",
    `background-image: url('${user.profile_pic_url}')`
  );

  searchResultsTextDiv.setAttribute("class", "searchResultsTextDiv");

  viewProfileButtonDiv.setAttribute("class", "viewProfileButtonDiv");
  viewProfileButton.setAttribute("class", "viewProfileButton");

  searchResultsName.setAttribute("class", "bodytitle");
  searchResultsUserAt.setAttribute("class", "bodytext");
  searchResultsIsVolunteer.setAttribute("class", "smallbutton");

  // ASSIGN TEMP VALUES TO TEHM
  searchResultsName.innerHTML = user.full_name;
  searchResultsUserAt.innerHTML = "@" + user.username;
  viewProfileButton.innerHTML = "View Profile";

  //APPEND EVERYTHING
  searchResultsDiv.appendChild(searchResultUserDiv);

  searchResultUserDiv.appendChild(searchResultsImgDiv);
  searchResultUserDiv.appendChild(searchResultsTextDiv);
  searchResultUserDiv.appendChild(viewProfileButtonDiv);

  searchResultsImgDiv.appendChild(searchResultsImg);

  searchResultsTextDiv.appendChild(searchResultsName);
  searchResultsTextDiv.appendChild(searchResultsUserAt);

  viewProfileButtonDiv.appendChild(viewProfileButton);
}

/* SOME BACKEND */
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

const BASE_URL = "https://marlonfajardo.ca/karma/v1";

let info = {};
let username;
get_firebase_info();

async function get_firebase_info() {
  firebase.auth().onAuthStateChanged(function (user) {
    return db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        console.log(user);
        info.fullName = user.fullName;
        username = user.username;
        info.email = user.email;
        info.username = user.username;

        let keyword = localStorage.getItem("search-keyword");
        searchForUser(keyword.toLowerCase());
      })
      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
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

function APIRequest(method, url, callback) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response;
      try {
        response = JSON.parse(this.responseText);
      } catch (err) {
        response = this.responseText;
      } finally {
        callback(response);
      }
    }
  };
}

function searchForUser(keyword) {
  console.log("searching...");
  console.log(keyword);

  document.getElementById("search-result-span").innerHTML = keyword;
  getAllUsers();
}

function getAllUsers() {
  const method = "GET";
  const endpoint = "/profiles";
  const url = "https://marlonfajardo.ca/karma/v1" + endpoint;
  APIRequest(method, url, searchUsers);
}

function searchUsers(results) {
  let profiles;
  try {
    profiles = JSON.parse(results);
  } catch (err) {
    console.log(err.message);
    profiles = results;
  }
  console.log("This is being called" + profiles.length);
  for (let i = 0; i < profiles.length; i++) {
    if (
      profiles[i].username
        .toLowerCase()
        .includes(
          document
            .getElementById("search-result-span")
            .textContent.toLowerCase() ||
            profiles[i].full_name
              .toLowerCase()
              .includes(
                document
                  .getElementById("search-result-span")
                  .textContent.toLowerCase()
              )
        )
    ) {
      console.log(
        profiles[i].full_name +
          " " +
          profiles[i].username +
          " " +
          profiles[i].is_volunteer
      );
      createUserSearch(profiles[i]);
    }
  }
}

/* FULL DISCLAIMER
IDK WHAT THE FOLLOWING CODE DOES
IDK WHO WROTE IT EITHER
ALL THE FRONTEND AND BACKEND CODE I THINK WE MIGHT NEED IS UP THERE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- CHRIS
*/

// const URL = "https://marlonfajardo.ca/karma/v1/profiles";
// const method = "GET";

// //@return list of users
// async function getUsers() {
//   // fetch(URL).then(data=>{
//   //     users = data
//   //
//   // })
//   let response = await fetch(URL);
//   let data = await response.json();
//   return data;
// }

// // function getUsers() {
// //     return fetch(URL)
// //         .then(response => response.json())
// //         .catch((e) => {console.log(e)})
// //
// // }
// function findUsers() {
//   getUsers().then((users) => {
//     let targetUser = document.getElementById("search-input").value;
//     // let showUser = document.createElement("textarea")
//     let area = document.getElementById("above-search");
//     if (targetUser === "") {
//       alert("The input user does no exist");
//     }
//     for (let i = 0; i < users.length; i++) {
//       // look for the entry with a matching `users` value
//       if (users[i].username === targetUser) {
//         let userName = users[i].username;
//         alert("We find " + users[i].username);
//         console.log(users[i].username);
//         let div123 = document.getElementById("searchResult");
//         let para = document.createElement("p");
//         para.innerHTML = users[i].username;
//         div123.appendChild(para);
//       }
//     }
//   });
// }

// // findUsers();
// // document.getElementById("search-button").addEventListener("click",  function () {
// //     // let targetUser = document.getElementById("search-texts").value;
// //     let targetUser = "marlon";
// //     getUsers().then(users => {
// //         for (let i = 0; i < users.length; i++){
// //             // look for the entry with a matching `code` value
// //             if (users[i].username === targetUser){
// //                 console.log(users[i].username)
// //             }
// //         }
// //     });
// // })
// //
// // document.getElementById("search-button").addEventListener() = findUsers;
// // findUsers()
// function demo() {
//   findUsers();
//   alert("asdasd");
// }
// // findUsers()
// // findUsers()
// // getUsers().then(response =>{
// //     console.log(response[0].username)
// // })
// //
