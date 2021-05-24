const aboutMeBtn = document.getElementById("edit-about-btn");
const skillsBtn = document.getElementById("edit-skills-btn");
const educationBtn = document.getElementById("edit-education-btn");
const experienceBtn = document.getElementById("edit-experience-btn");
const awardsBtn = document.getElementById("edit-awards-btn");

aboutMeBtn.onclick = function () {
  let aboutMeInput = document.createElement("input");
  aboutMeInput.setAttribute("style", "width: 100%");
  aboutMeInput.value = document.getElementById("aboutMe-Profile").textContent;

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("class", "quarternarybutton");
  cancelBtn.setAttribute("style", "margin-right: 8px");
  cancelBtn.innerHTML = "Cancel";

  let updateBtn = document.createElement("button");
  updateBtn.setAttribute("class", "tertiarybutton");
  updateBtn.innerHTML = "Update your description";

  let aboutMeDiv = document.getElementById("aboutme");
  aboutMeDiv.innerHTML = "";

  let headingAndEditDiv = document.createElement("div");
  headingAndEditDiv.setAttribute("class", "heading-and-edit");
  headingAndEditDiv.setAttribute("style", "margin-bottom: 10px");

  let heading = document.createElement("p");
  heading.setAttribute("class", "heading2");
  heading.innerHTML = "About me";

  let edit = document.createElement("i");
  edit.setAttribute("class", "fas fa-edit");
  edit.setAttribute("id", "edit-about-btn");

  headingAndEditDiv.appendChild(heading);
  headingAndEditDiv.appendChild(edit);

  let buttonsDiv = document.createElement("div");
  buttonsDiv.appendChild(cancelBtn);
  buttonsDiv.appendChild(updateBtn);
  buttonsDiv.setAttribute("style", "margin-top: 8px");

  aboutMeDiv.appendChild(headingAndEditDiv);
  aboutMeDiv.appendChild(aboutMeInput);
  aboutMeDiv.appendChild(buttonsDiv);
};
