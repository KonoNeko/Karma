// function getUserPostImage () {
//     let userPic = document.createElement("img")
//     userPic.src = "./images/placeholder.jpg";
//     userPicDiv.appendChild(userPic);
// }


// function getUserPostImage() {
//     var imagesrc = "./images/placeholder.jpg";
//     show_image(imagesrc, 400,400, "Google Logo");
// }


// function show_image(src, width, height, alt) {
//     var img = document.createElement("img");
//     img.src = src;
//     img.width = width;
//     img.height = height;
//     img.alt = alt;
//     img.style.marginLeft = "50px";
//     img.style.marginTop = "-550px";
//     document.body.appendChild(img);
// }

function loadHome() {
    loadPost();
  }


function loadPost() {
    let modal = document.getElementById('postModal');
    createComments(modal);
}

function createComment(profilePic, username, comment, timestamp, commentID) {
    let commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.id = commentID;

    let profilePicDiv = document.createElement("div");
    profilePicDiv.setAttribute("class", "profilepic");
    profilePicDiv.setAttribute("style", `background-image: url('${profilePic}')`);

    let commentUserName = document.createElement("p");
    commentUserName.setAttribute("class", "commentUserName");
    commentUserName.innerHTML = username;

    let commentTxt = document.createElement("p");
    commentTxt.setAttribute("class", "commentTxt");
    commentTxt.innerHTML = comment;

    let commentTime = document.createElement("p");
    commentTime.setAttribute("class", "timestamp");

    let replyButton = document.createElement("p");
    replyButton.setAttribute("class", "replyBtn");
    replyButton.innerHTML = "Reply";

    commentDiv.appendChild(profilePicDiv);
    commentDiv.appendChild(commentUserName);
    commentDiv.appendChild(commentTxt);
    commentDiv.appendChild(commentTime);
    commentDiv.appendChild(replyButton);

    return commentDiv;
}


function createComments(comments) {
    const placeholderImg = './images/placeholder.jpg';
    let rightDiv = document.getElementById("rightDiv");

    let postImage = document.getElementById("postPicture");
    postImage.setAttribute("style", `background-image: url('${placeholderImg}')`);



    let postOwnerTitle = document.getElementById("postOwnerTitle");
    let posterProfilePic = document.getElementById("postOwnerProfilePic");
    posterProfilePic.setAttribute("style", `background-image: url('${placeholderImg}')`);


    let nameAndTimeDiv = document.getElementById("nameAndTimeDiv");
    let userName = document.getElementById("postOwnerUsername");
    userName.innerHTML = "User name";
    let timePosted = document.getElementById("timePosted");
    timePosted.innerHTML = "30 minutes ago";
    nameAndTimeDiv.appendChild(userName);
    nameAndTimeDiv.appendChild(timePosted);

    postOwnerTitle.appendChild(posterProfilePic);
    postOwnerTitle.appendChild(nameAndTimeDiv);

    let commentsDiv = document.getElementById("commentList");


    let captionImg = document.createElement("div");
    captionImg.setAttribute("class", "profilepic");
    captionImg.setAttribute("style", "padding-bottom: 10px");
    captionImg.setAttribute("style", `background-image: url('${placeholderImg}')`);

    let captionUserName = document.createElement("p");
    captionUserName.setAttribute("class", "captionUserName");
    captionUserName.innerHTML = "captionUserName";

    let caption = document.createElement("p");
    caption.setAttribute("class", "caption");
    caption.innerHTML = "caption";

    commentsDiv.appendChild(captionImg);
    commentsDiv.appendChild(captionUserName);
    commentsDiv.appendChild(caption);

    let comment1 = createComment(placeholderImg, "username", "This is a comment", "now", 1);
    let comment2 = createComment(placeholderImg, "username", "This is a comment", "5min", 2);
    let comment3 = createComment(placeholderImg, "username", "This is a comment", "10min", 3);
    let comment4 = createComment(placeholderImg, "username", "This is a comment", "15min", 4);
    let comment5 = createComment(placeholderImg, "username", "This is a comment", "20min", 5);


    commentsDiv.appendChild(comment1);
    commentsDiv.appendChild(comment2);
    commentsDiv.appendChild(comment3);
    commentsDiv.appendChild(comment4);
    commentsDiv.appendChild(comment5);
}