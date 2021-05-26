function loadSearch() {
  createUserSearch();
  createUserSearch();
  createUserSearch();
  createUserSearch();
}

/* ALL FRONTEND CREATING ELEMENTS PROGRAMMATICALLY WITH JAVASCRIPT */
function createUserSearch() {
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
    "background-image: url('./images/placeholder.jpg')"
  );

  searchResultsTextDiv.setAttribute("class", "searchResultsTextDiv");

  viewProfileButtonDiv.setAttribute("class", "viewProfileButtonDiv");
  viewProfileButton.setAttribute("class", "viewProfileButton");

  searchResultsName.setAttribute("class", "bodytitle");
  searchResultsUserAt.setAttribute("class", "bodytext");
  searchResultsIsVolunteer.setAttribute("class", "smallbutton");

  // ASSIGN TEMP VALUES TO TEHM
  searchResultsName.innerHTML = "Astris Frost";
  searchResultsUserAt.innerHTML = "@Astris.Frost";
  searchResultsIsVolunteer.innerHTML = "Volunteer Organization";
  viewProfileButton.innerHTML = "View Profile";

  //APPEND EVERYTHING
  searchResultsDiv.appendChild(searchResultUserDiv);

  searchResultUserDiv.appendChild(searchResultsImgDiv);
  searchResultUserDiv.appendChild(searchResultsTextDiv);
  searchResultUserDiv.appendChild(viewProfileButtonDiv);

  searchResultsImgDiv.appendChild(searchResultsImg);

  searchResultsTextDiv.appendChild(searchResultsName);
  searchResultsTextDiv.appendChild(searchResultsUserAt);
  searchResultsTextDiv.appendChild(searchResultsIsVolunteer);

  viewProfileButtonDiv.appendChild(viewProfileButton);
}

/* FULL DISCLAIMER
IDK WHAT THE FOLLOWING CODE DOES
IDK WHO WROTE IT EITHER
ALL MY FRONTEND CODE THAT U MIGHT NEED IS UP THERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- CHRIS
*/

const URL = "https://marlonfajardo.ca/karma/v1/profiles";
const method = "GET";

//@return list of users
async function getUsers() {
  // fetch(URL).then(data=>{
  //     users = data
  //
  // })
  let response = await fetch(URL);
  let data = await response.json();
  return data;
}

// function getUsers() {
//     return fetch(URL)
//         .then(response => response.json())
//         .catch((e) => {console.log(e)})
//
// }
function findUsers() {
  getUsers().then((users) => {
    let targetUser = document.getElementById("search-input").value;
    // let showUser = document.createElement("textarea")
    let area = document.getElementById("above-search");
    if (targetUser === "") {
      alert("The input user does no exist");
    }
    for (let i = 0; i < users.length; i++) {
      // look for the entry with a matching `users` value
      if (users[i].username === targetUser) {
        let userName = users[i].username;
        alert("We find " + users[i].username);
        console.log(users[i].username);
        let div123 = document.getElementById("searchResult");
        let para = document.createElement("p");
        para.innerHTML = users[i].username;
        div123.appendChild(para);
      }
    }
  });
}

// findUsers();
// document.getElementById("search-button").addEventListener("click",  function () {
//     // let targetUser = document.getElementById("search-texts").value;
//     let targetUser = "marlon";
//     getUsers().then(users => {
//         for (let i = 0; i < users.length; i++){
//             // look for the entry with a matching `code` value
//             if (users[i].username === targetUser){
//                 console.log(users[i].username)
//             }
//         }
//     });
// })
//
// document.getElementById("search-button").addEventListener() = findUsers;
// findUsers()
function demo() {
  findUsers();
  alert("asdasd");
}
// findUsers()
// findUsers()
// getUsers().then(response =>{
//     console.log(response[0].username)
// })
//
