function like(){
    let heart = document.getElementById("preheart");
    heart.setAttribute("src", "images/likeheart.png");
}

const URL2 = " https://marlonfajardo.ca/karma/v1/posts"
const method2 = "GET"

//@return list of users
async function  getPost(){

    let response = await fetch(URL2);
    let data = await response.json();
    return data;
}

function addLikes(){
    getPost().then(posts => {
        for (let i = 0; i < posts.length; i++){
            // look for the entry with a matching `users` value
            // if (users[i].username === targetUser){
            console.log(posts[i])
            // }
        }
    });
}
// addLikes()