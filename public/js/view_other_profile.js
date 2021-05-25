
// profileDiv is the element that you want to click on to redirect you
// to the another person's profile page
//
// profileUsername is the username of the profile page that you want to visit
function setProfileRedirect(profileDiv, profileUsername) {
    profileDiv.onclick = () => {
        localStorage.clear();
        localStorage.setItem("profileUsername", profileUsername);
        console.log(localStorage.getItem("profileUsername"));
        window.location.href = "other-profile.html";
    }
}


// Example code of how to integrate it ↓↓↓ 
let div1 = document.getElementById("profileDiv1"); 
let username1 = document.getElementById("username1").textContent;

let div2 = document.getElementById("profileDiv2"); 
let username2 = document.getElementById("username2").textContent;

let div3 = document.getElementById("profileDiv3"); 
let username3 = document.getElementById("username3").textContent;




setProfileRedirect(div1, username1);
setProfileRedirect(div2, username2);
setProfileRedirect(div3, username3);