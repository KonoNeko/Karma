const aboutMeBtn = document.getElementById("edit-about-btn");
const skillsBtn = document.getElementById("edit-skills-btn");
const educationBtn = document.getElementById("edit-education-btn");
const experienceBtn = document.getElementById("edit-experience-btn");
const awardsBtn = document.getElementById("edit-awards-btn");

aboutMeBtn.setAttribute("onclick", "aboutMeOnclick()");
skillsBtn.setAttribute("onclick", "skillsOnclick()");
educationBtn.setAttribute("onclick", "educationOnclick()");
experienceBtn.setAttribute("onclick", "experienceOnclick()");
awardsBtn.setAttribute("onclick", "awardsOnclick()");

function aboutMeOnclick() {
  document
    .getElementById("aboutme-edit")
    .setAttribute("style", "display: unset");

  document.getElementById("aboutme-paragraph").value =
    document.getElementById("aboutMe-Profile").textContent;

  document
    .getElementById("aboutMe-Profile")
    .setAttribute("style", "display: none");

  document.getElementById("aboutme-cancel").onclick = function () {
    document
      .getElementById("aboutme-edit")
      .setAttribute("style", "display: none");
    document
      .getElementById("aboutMe-Profile")
      .setAttribute("style", "display: unset");
  };

  document.getElementById("aboutme-edit").onclick = function () {
    /* BACKEND GUY DO UR MAGIC HERE */
  };
}

function skillsOnclick() {}

function educationOnclick() {}

function experienceOnclick() {}

function experienceOnclick() {}
