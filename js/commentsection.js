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
    loadComments();
  }


function loadComments() {
    let comments = document.getElementById('commentsbox');
    createComments(comments);
}
  


function createComments(comments) {

    let leftDiv = document.createElement("p");
    leftDiv.setAttribute("class", "mainDivComments");
    
    let picture = document.createElement("div");
    picture.setAttribute("class", "postpicture");
    picture.setAttribute(
    "style",
    "background-image: url('./images/placeholder.jpg')"
    );

    leftDiv.appendChild(picture);

    comments.appendChild(leftDiv);





    rightDiv = document.createElement("div");
    rightDiv.setAttribute("class", "rightDivComments");


    let storyImgDiv = document.createElement("div");
    storyImgDiv.setAttribute("class", "profilepic");
    storyImgDiv.setAttribute("style", "padding-bottom: 10px");

    storyImgDiv.setAttribute(
    "style",
    "background-image: url('./images/placeholder.jpg')"
    );

    let userName = document.createElement("p");
    userName.setAttribute("class", "userName");
    userName.innerHTML = "User name";

    let timePosted = document.createElement("p");
    timePosted.setAttribute("class", "timePosted");
    timePosted.innerHTML = "30 minutes ago";

    rightDiv.appendChild(storyImgDiv);
    rightDiv.appendChild(userName);
    rightDiv.appendChild(timePosted);



    let captionImgDiv = document.createElement("div");
    captionImgDiv.setAttribute("class", "profilepic");
    captionImgDiv.setAttribute("style", "padding-bottom: 10px");

    captionImgDiv.setAttribute(
    "style",
    "background-image: url('./images/placeholder.jpg')"
    );

    let captionUserName = document.createElement("p");
    captionUserName.setAttribute("class", "captionUserName");

    let caption = document.createElement("p");
    caption.setAttribute("class", "caption");

    rightDiv.appendChild(captionImgDiv);
    rightDiv.appendChild(captionUserName);
    rightDiv.appendChild(caption);



}