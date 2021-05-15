function loadHome() {
    loadPost();
  }


function loadPost() {
    const placeholderImg = './images/placeholder.jpg';
    createModal();
    displayPost(placeholderImg);
    createComments(placeholderImg);
}

function createModal() {
    let modal = document.createElement("div");
    modal.id = "postModal1";

    let leftSideDiv = document.createElement("div");
    leftSideDiv.id = "postPicture";
    leftSideDiv.className = "leftDiv";

    let rightSideDiv = document.createElement("div");
    leftSideDiv.id = "rightDiv";
    leftSideDiv.className = "rightDiv";

    modal.appendChild(leftSideDiv);
    modal.appendChild(rightSideDiv);

    document.body.appendChild(modal);
}

function createComment(profilePic, username, comment, timestamp, commentID) {
    let commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.id = commentID;

    let profilePicDiv = document.createElement("div");
    profilePicDiv.setAttribute("class", "profilepic");
    profilePicDiv.setAttribute("style", `background-image: url('${profilePic}')`);

    let commentBody = document.createElement("div");
    commentBody.className = "commentBody";

    let commentParagraph = createCommentParagraph(username, comment);

    let timeAndReply = document.createElement("div");
    let commentTime = document.createElement("span");
    commentTime.setAttribute("class", "timeAndReply");
    commentTime.innerHTML = timestamp;
    let replyButton = document.createElement("span");
    replyButton.setAttribute("class", "timeAndReply");
    replyButton.innerHTML = "Reply";
    replyButton.id = commentID;
    timeAndReply.appendChild(commentTime);
    timeAndReply.appendChild(replyButton);

    commentBody.appendChild(commentParagraph);
    commentBody.appendChild(timeAndReply);

    commentDiv.appendChild(profilePicDiv);
    commentDiv.appendChild(commentBody);

    return commentDiv;
}

function createCommentParagraph(username, comment) {
    let commentParagraph = document.createElement("p");
    let commentUserName = document.createElement("span");
    commentUserName.setAttribute("class", "commentUsername");
    commentUserName.innerHTML = username;

    let emptySpace = document.createElement("span");
    emptySpace.innerText = " ";

    let commentTxt = document.createElement("span");
    commentTxt.setAttribute("class", "commentTxt");
    commentTxt.innerHTML = comment;

    commentParagraph.appendChild(commentUserName);
    commentParagraph.appendChild(emptySpace);
    commentParagraph.appendChild(commentTxt);

    return commentParagraph;
}

function loadCaption(profilePic, username, caption) {
    let captionDiv = document.createElement("div");
    captionDiv.className = "comment";
    captionDiv.id = "caption";

    let captionImg = document.createElement("div");
    captionImg.setAttribute("class", "profilepic");
    captionImg.setAttribute("style", `background-image: url('${profilePic}')`);

    let captionParagraph = createCommentParagraph(username, caption);

    captionDiv.appendChild(captionImg);
    captionDiv.appendChild(captionParagraph);

    return captionDiv;
}

function displayPost(placeholderImg) {
    let postImage = document.getElementById("postPicture");
    postImage.setAttribute("style", `background-image: url('${placeholderImg}')`);
}


function createComments(placeholderImg) {

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


    let captionDiv = loadCaption(placeholderImg, "Username", "This is a caption.")

    let comment1 = createComment(placeholderImg, "username", "This is a comment", "now", 1);
    let comment2 = createComment(placeholderImg, "username", "This is a comment", "5min", 2);
    let comment3 = createComment(placeholderImg, "username", "This is a comment", "10min", 3);
    let comment4 = createComment(placeholderImg, "username", "This is a comment", "15min", 4);
    let comment5 = createComment(placeholderImg, "username", "This is a comment", "20min", 5);

    commentsDiv.appendChild(captionDiv);
    commentsDiv.appendChild(comment1);
    commentsDiv.appendChild(comment2);
    commentsDiv.appendChild(comment3);
    commentsDiv.appendChild(comment4);
    commentsDiv.appendChild(comment5);
}