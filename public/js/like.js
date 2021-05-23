const URL2 = " https://marlonfajardo.ca/karma/v1/posts"
const method2 = "POST"
function like(){
    let heart = document.getElementById("likeBtn");
    heart.setAttribute(  "style",
        "font-size: 24px; color: red; margin-top: 10px; margin-bottom: 10px; margin-right:10px; ");
}




//@return list of users
async function  getPost(){
    let response = await fetch(URL2);
    let data = await response.json();
    return data;
}

function addLikes(){
    getPost().then(posts => {
        let name = document.getElementById("userName")
        for (let i = 0; i < posts.length; i++){
            // look for the entry with a matching `users` value
            if (posts[i].username === name){
            console.log(posts[i].likes+1)
            }
        }
    });
}
addLikes()