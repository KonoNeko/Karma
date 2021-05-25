const URL3 = "https://marlonfajardo.ca/karma/v1/post/comment?id=value&post=value&msg=value"


function addComments(){
        let comments = document.getElementById("commentText")
        let div = document.getElementById("commentList" + post.post_id)
        let para = document.createElement("p");
        para.value= comments;
        div.appendChild(para);
}