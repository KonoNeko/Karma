const aboutMeBtn = document.getElementById("edit-about-btn");
const skillsBtn = document.getElementById("edit-skills-btn");
const educationBtn = document.getElementById("edit-education-btn");
const experienceBtn = document.getElementById("edit-experience-btn");
const awardsBtn = document.getElementById("edit-awards-btn");

aboutMeBtn.onclick = function() {
    let updateBtn = document.createElement("button");
    updateBtn.setAttribute("class", "primarybutton");
    updateBtn.innerHTML = "Update your description";
}