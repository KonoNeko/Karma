var inputs = document.getElementsByTagName("input");
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
  let skillsDiv = document.getElementById("skills");

  let skillsEditDiv = document.createElement("div");
  let skillsCancelBtn = document.createElement("button");
  let skillsEditBtn = document.createElement("button");

  skillsEditDiv.setAttribute("class", "skills-edit-div");
  skillsCancelBtn.setAttribute("class", "quarternarybutton");
  skillsCancelBtn.setAttribute("id", "cancel-skills-btn");
  skillsCancelBtn.innerHTML = "Cancel";
  skillsEditBtn.setAttribute("class", "tertiarybutton");
  skillsEditBtn.setAttribute("id", "edit-skills-btn");
  skillsEditBtn.innerHTML = "Edit information";

  skillsEditDiv.appendChild(skillsCancelBtn);
  skillsEditDiv.appendChild(skillsEditBtn);

  skillsDiv.appendChild(skillsEditDiv);

  let skillsBtns = document.getElementsByClassName("skillsbtn");
  skillsBtns.forEach(function (skillsBtn) {
    let skillsInput = document.createElement("input");
    skillsInput.setAttribute("class", "skillsinput");
    skillsInput.value = skillsBtn.textContent;
    skillsEditDiv.appendChild(skillsInput);
  });

  skillsDiv.innerHTML = "";

  skillsCancelBtn.onclick = function () {
    document
      .getElementById("skills-edit")
      .setAttribute("style", "display: none");
  };

  skillsEditBtn.onclick = function () {
    /* BACKEND GUY DO UR MAGIC HERE */
  };

  skillsAlreadyClicked = true;
}

function educationOnclick() {}

function experienceOnclick() {}

function experienceOnclick() {}
