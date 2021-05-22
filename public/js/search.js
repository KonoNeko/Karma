const URL = "https://marlonfajardo.ca/karma/v1/profiles"
const method = "GET"

//@return list of users
async function  getUsers(){
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
function findUsers(){
    getUsers().then(users => {
        let targetUser = document.getElementById("search-input").value;
        // let showUser = document.createElement("textarea")
        let area = document.getElementById("above-search")
        if(targetUser === "")
        {
            alert("The input user does no exist");
        }
        for (let i = 0; i < users.length; i++){
            // look for the entry with a matching `users` value
            if (users[i].username === targetUser){
                let userName = users[i].username;
                alert("We find "+ users[i].username)
                console.log(users[i].username);
                let div123 = document.getElementById("searchResult");
                let para = document.createElement("p");
                para.innerHTML= users[i].username
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
function demo(){
    findUsers()
    alert("asdasd")
}
// findUsers()
// findUsers()
// getUsers().then(response =>{
//     console.log(response[0].username)
// })
//
