const URL2 = " https://marlonfajardo.ca/karma/v1/post/like?id=value&post=value"
const method2 = "POST"
function like(x){
    let heart = document.getElementById("likeBtn");
    let text = document.getElementById("likeText")
    heart.setAttribute(  "style",
        "font-size: 24px; color: red; margin-top: 10px; margin-bottom: 10px; margin-right:10px; ");
    text.innerText = "3 likes"

}



//@return list of posts
async function  getPost(){
    let response = await fetch(URL2);
    let data = await response.json();
    return data;
}

function addLikes(){
    getPost().then(posts => {
        let name = document.getElementById("userName")
        // for (let i = 0; i < posts.length; i++){
        //     // look for the entry with a matching `users` value
        //     // if (posts[i].username === name){
        //     console.log(posts[i].post_info.likes)
        //     // }
        // }
        posts[1].post_info.likes = posts[1].post_info.likes+1
        console.log(posts[1].post_info.likes)
    });
}
addLikes()