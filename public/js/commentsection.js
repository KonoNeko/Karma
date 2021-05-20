function loadHome() {
    loadPost();
  }


function loadPost() {
    const placeholderImg = './images/placeholder.jpg';
    createModal(1, placeholderImg);
}

function createModal(postID, placeholderImg) {
    let overlay = document.createElement("div");
    overlay.id = "modalOverlay";

    let modal = document.createElement("div");
    modal.className = "postModal";
    modal.id = "post" + postID;
    modal.style.display = "none";

    let leftSideDiv = document.createElement("div");
    leftSideDiv.id = "postPicture";
    leftSideDiv.className = "leftDiv";

    let rightSideDiv = document.createElement("div");
    rightSideDiv.id = "rightDiv";
    rightSideDiv.className = "rightDiv";

    let postDetails = document.createElement("div");
    postDetails.id = "postOwnerTitle";

    let profilePic = document.createElement("div");
    profilePic.id = "postOwnerProfilePic";
    profilePic.className = "profilepic";

    let nameAndTime = document.createElement("div");
    nameAndTime.id = "nameAndTimeDiv";

    let username = document.createElement("p");
    username.id = "postOwnerUsername";

    let time = document.createElement("p");
    time.id = "timePosted";
    
    nameAndTime.appendChild(username);
    nameAndTime.appendChild(time);

    postDetails.appendChild(profilePic);
    postDetails.appendChild(nameAndTime);
    rightSideDiv.appendChild(postDetails);


    rightSideDiv.appendChild(createLine());

    let commentList = document.createElement("div");
    commentList.id = "commentList";

    let captionDiv = loadCaption(placeholderImg, "Username", "This is a caption.");
    rightSideDiv.appendChild(captionDiv);
    rightSideDiv.appendChild(createLine());

    rightSideDiv.appendChild(commentList);
    rightSideDiv.appendChild(createLine());

    let interactionDiv = document.createElement("div");
    interactionDiv.id = "interactionDiv";

    let interactionButtons = document.createElement("div");
    interactionButtons.id = "interactionButtons";

    let likesLine = document.createElement("p");
    likesLine.innerHTML = `<span id="likeUsername"></span> and <span id="likes"></span> others like this post`;

    let commentForm = document.createElement("form");
    commentForm.className = "commentForm";
    
    let commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Add a comment...";

    let commentSubmit = document.createElement("button");
    commentSubmit.type = "submit";
    commentSubmit.innerText = "Post";

    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentSubmit);

    interactionDiv.appendChild(interactionButtons);
    interactionDiv.appendChild(likesLine);
    interactionDiv.appendChild(commentForm);
    rightSideDiv.appendChild(interactionDiv);

    modal.appendChild(leftSideDiv);
    modal.appendChild(rightSideDiv);

    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    displayPost(placeholderImg);
    displayPostDetails("Username", "30 minutes ago", placeholderImg);
    displayComments(placeholderImg);
}

function hideModal(id) {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("post" + id).style.display = "none";
}

function displayModal(id) {
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("modalOverlay").onclick = () => { hideModal(id) };
    document.getElementById("post" + id).style.display = "flex";
}


function displayPost(placeholderImg) {
    let postImage = document.getElementById("postPicture");
    postImage.setAttribute("style", `background-image: url('${placeholderImg}')`);
}

function displayPostDetails(username, time, placeholderImg) {
    let postOwnerTitle = document.getElementById("postOwnerTitle");

    let posterProfilePic = document.getElementById("postOwnerProfilePic");
    posterProfilePic.setAttribute("style", `background-image: url('${placeholderImg}')`);

    let nameAndTimeDiv = document.getElementById("nameAndTimeDiv");
    let userName = document.getElementById("postOwnerUsername");
    userName.innerHTML = username;
    let timePosted = document.getElementById("timePosted");
    timePosted.innerHTML = time;
    nameAndTimeDiv.appendChild(userName);
    nameAndTimeDiv.appendChild(timePosted);

    postOwnerTitle.appendChild(posterProfilePic);
    postOwnerTitle.appendChild(nameAndTimeDiv);
}


function createLine() {
    let line = document.createElement("hr");
    line.className = "comment-hr";
    return line;
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


function displayComments(placeholderImg) {
    let commentsDiv = document.getElementById("commentList");


    // let captionDiv = loadCaption(placeholderImg, "Username", "This is a caption.");
    // commentsDiv.appendChild(captionDiv);
    // commentsDiv.appendChild(createLine());
    let comment1 = createComment(placeholderImg, "username", "This is a comment", "now", 1);
    let comment2 = createComment(placeholderImg, "username", "This is a comment", "5min", 2);
    let comment3 = createComment(placeholderImg, "username", "This is a comment", "10min", 3);
    let comment4 = createComment(placeholderImg, "username", "This is a comment", "15min", 4);
    let comment5 = createComment(placeholderImg, "username", "This is a comment", "20min", 5);
    let comment6 = createComment(placeholderImg, "username", "This is a comment", "20min", 6);
    let comment7 = createComment(placeholderImg, "username", "This is a comment", "20min", 7);
    let comment8 = createComment(placeholderImg, "username", "This is a comment", "20min", 8);

    
    
    commentsDiv.appendChild(comment1);
    commentsDiv.appendChild(comment2);
    // commentsDiv.appendChild(comment3);
    // commentsDiv.appendChild(comment4);
    // commentsDiv.appendChild(comment5);
    // commentsDiv.appendChild(comment6);
    // commentsDiv.appendChild(comment7);
    // commentsDiv.appendChild(comment8);
}