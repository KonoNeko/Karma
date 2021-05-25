var inputs = document.getElementsByClassName("skillsinput");
for (index = 0; index < inputs.length; ++index) {
  inputs[index].addEventListener("input", resizeInput);
  resizeInput.call(inputs[index]);
}

function resizeInput() {
  this.style.width = this.value.length + "ch";
}

const aboutMeBtn = document.getElementById("edit-about-btn");
const skillsBtn = document.getElementById("edit-skills-btn");
const educationBtn = document.getElementById("edit-education-btn");
const experienceBtn = document.getElementById("edit-experience-btn");
const awardsBtn = document.getElementById("edit-awards-btn");

let skillsAlreadyClicked = false;
let educationAlreadyClicked = false;
let experienceAlreadyClicked = false;
let awardsAlreadyClicked = false;

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

  document.getElementById("cancel-about-btn").onclick = function () {
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

function skillsOnclick() {
  document.getElementById("skills-inputs").innerHTML = "";

  document
    .getElementById("skills-edit")
    .setAttribute("style", "display: unset");

  let skillsBtns = document.getElementsByClassName("skillsbtn");
  for (i = 0; i < skillsBtns.length; i++) {
    let skillsInput = document.createElement("input");
    skillsInput.setAttribute("class", "skillsinput");
    skillsInput.value = skillsBtns[i].textContent;
    document.getElementById("skills-inputs").appendChild(skillsInput);
  }

  document
    .getElementById("skills-buttons")
    .setAttribute("style", "display: none");

  document.getElementById("cancel-skills-btn").onclick = function () {
    document
      .getElementById("skills-edit")
      .setAttribute("style", "display: none");
    document
      .getElementById("skills-buttons")
      .setAttribute("style", "display: unset");
  };

  document.getElementById("skills-edit").onclick = function () {
    /* BACKEND GUY DO UR MAGIC HERE */
  };
}

function educationOnclick() {}

function experienceOnclick() {}

function experienceOnclick() {}
