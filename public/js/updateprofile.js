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

function educationOnclick() {
  document.getElementById("education-edit-div").innerHTML = "";

  document
    .getElementById("education-edit")
    .setAttribute("style", "display: unset");

  let educationSchoolNames = document.getElementsByClassName("schoolName");
  let educationParas = document.getElementsByClassName("schoolpara");
  let educationPics = document.getElementsByClassName("educationpic");
  let educationPosts = document.getElementsByClassName("education-post-div");

  for (i = 0; i < educationPosts.length; i++) {
    let educationPostDiv = document.createElement("div");
    educationPostDiv.setAttribute("style", "display: flex;");

    let educationPostImgDiv = document.createElement("div");
    let educationPostImg = document.createElement("img");
    let educationPostImgUpload = document.createElement("p");

    educationPostImg.src = educationPics[i].src;
    educationPostImg.setAttribute("style", "border-radius: 10px; width: 90%;");

    educationPostImgUpload.innerHTML = "Upload new image";
    educationPostImgUpload.setAttribute("class", "smalltext");
    educationPostImgUpload.setAttribute(
      "style",
      "color: #51B09F; font-weight: bold; margin-bottom: 10px;"
    );

    let educationPostInputDiv = document.createElement("div");
    let educationPostInputSchool = document.createElement("input");
    let educationPostInputSchoolPara = document.createElement("input");

    educationPostInputSchool.value = educationSchoolNames[i].textContent;
    educationPostInputSchoolPara.value = educationParas[i].textContent;
    educationPostInputSchool.setAttribute(
      "style",
      "margin-bottom: 5px; width: 80%;"
    );
    educationPostInputSchoolPara.setAttribute("style", "width: 80%");

    educationPostImgDiv.appendChild(educationPostImg);
    educationPostImgDiv.appendChild(educationPostImgUpload);

    educationPostInputDiv.appendChild(educationPostInputSchool);
    educationPostInputDiv.appendChild(educationPostInputSchoolPara);

    educationPostImgDiv.setAttribute("style", "width: 50%; margin-right: 10px");
    educationPostInputDiv.setAttribute(
      "style",
      "width: 50%; margin-left: 10px"
    );

    educationPostDiv.appendChild(educationPostImgDiv);
    educationPostDiv.appendChild(educationPostInputDiv);

    document.getElementById("education-edit-div").appendChild(educationPostDiv);
  }

  document
    .getElementById("education-div")
    .setAttribute("style", "display: none");

  document.getElementById("cancel-education-btn").onclick = function () {
    document
      .getElementById("education-edit")
      .setAttribute("style", "display: none");
    document
      .getElementById("education-div")
      .setAttribute("style", "display: unset");
  };

  document.getElementById("education-edit").onclick = function () {
    /* BACKEND GUY DO UR MAGIC HERE */
  };
}

function experienceOnclick() {
  document.getElementById("experience-edit-div").innerHTML = "";

  document
    .getElementById("experience-edit")
    .setAttribute("style", "display: unset");

  document
    .getElementById("experience-div")
    .setAttribute("style", "display: none");

  document.getElementById("cancel-experience-btn").onclick = function () {
    document
      .getElementById("experience-edit")
      .setAttribute("style", "display: none");
    document
      .getElementById("experience-div")
      .setAttribute("style", "display: unset");
  };

  document.getElementById("experience-edit").onclick = function () {
    /* BACKEND GUY DO UR MAGIC HERE */
  };

  let experienceNames = document.getElementsByClassName("experienceName");
  let experienceParas = document.getElementsByClassName("employerpara");
  let experiencePics = document.getElementsByClassName("experiencepic");
  let experiencePosts = document.getElementsByClassName("experience-post-div");

  for (i = 0; i < experiencePosts.length; i++) {
    let experiencePostDiv = document.createElement("div");
    experiencePostDiv.setAttribute("style", "display: flex;");

    let experiencePostImgDiv = document.createElement("div");
    let experiencePostImg = document.createElement("img");
    let experiencePostImgUpload = document.createElement("p");

    experiencePostImg.src = experiencePics[i].src;
    experiencePostImg.setAttribute("style", "border-radius: 10px; width: 90%;");

    experiencePostImgUpload.innerHTML = "Upload new image";
    experiencePostImgUpload.setAttribute("class", "smalltext");
    experiencePostImgUpload.setAttribute(
      "style",
      "color: #51B09F; font-weight: bold; margin-bottom: 10px;"
    );

    let experiencePostInputDiv = document.createElement("div");
    let experiencePostInputTitle = document.createElement("input");
    let experiencePostInputPara = document.createElement("input");

    experiencePostInputTitle.value = experienceNames[i].textContent;

    experiencePostInputPara.value = experienceParas[i].textContent;
    experiencePostInputTitle.setAttribute(
      "style",
      "width: 80%; margin-bottom: 5px"
    );

    experiencePostImgDiv.appendChild(experiencePostImg);
    experiencePostImgDiv.appendChild(experiencePostImgUpload);

    experiencePostInputDiv.appendChild(experiencePostInputTitle);
    experiencePostInputDiv.appendChild(experiencePostInputPara);

    experiencePostInputPara.setAttribute("style", "width: 80%");

    experiencePostImgDiv.setAttribute(
      "style",
      "width: 50%; margin-right: 10px"
    );
    experiencePostInputDiv.setAttribute(
      "style",
      "width: 50%; margin-left: 10px"
    );

    experiencePostDiv.appendChild(experiencePostImgDiv);
    experiencePostDiv.appendChild(experiencePostInputDiv);

    document
      .getElementById("experience-edit-div")
      .appendChild(experiencePostDiv);
  }
}

function awardsOnclick() {
  document.getElementById("awards-edit-div").innerHTML = "";

  document
    .getElementById("awards-edit")
    .setAttribute("style", "display: unset");

  document.getElementById("awards-div").setAttribute("style", "display: none");

  document.getElementById("cancel-awards-btn").onclick = function () {
    document
      .getElementById("awards-edit")
      .setAttribute("style", "display: none");
    document
      .getElementById("awards-div")
      .setAttribute("style", "display: unset");
  };

  document.getElementById("awards-edit").onclick = function () {
    /* BACKEND GUY DO UR MAGIC HERE */
  };

  let awardsNames = document.getElementsByClassName("awardsName");
  let awardsParas = document.getElementsByClassName("awardspara");
  let awardsPics = document.getElementsByClassName("awardspic");
  let awardsPosts = document.getElementsByClassName("awards-post-div");

  for (i = 0; i < awardsPosts.length; i++) {
    let awardsPostDiv = document.createElement("div");
    awardsPostDiv.setAttribute("style", "display: flex;");

    let awardsPostImgDiv = document.createElement("div");

    let awardsPostImg = document.createElement("img");
    let awardsPostImgUpload = document.createElement("p");

    awardsPostImg.src = awardsPics[i].src;
    awardsPostImg.setAttribute("style", "border-radius: 10px; width: 90%;");

    awardsPostImgUpload.innerHTML = "Upload new image";
    awardsPostImgUpload.setAttribute("class", "smalltext");
    awardsPostImgUpload.setAttribute(
      "style",
      "color: #51B09F; font-weight: bold; margin-bottom: 10px;"
    );

    let awardsPostInputDiv = document.createElement("div");
    let awardsPostInputTitle = document.createElement("input");
    let awardsPostInputPara = document.createElement("input");

    awardsPostInputTitle.value = awardsNames[i].textContent;

    awardsPostInputPara.value = awardsParas[i].textContent;
    awardsPostInputTitle.setAttribute(
      "style",
      "margin-bottom: 5px; width: 80%; "
    );
    awardsPostInputPara.setAttribute("style", "width: 80%;");

    awardsPostImgDiv.appendChild(awardsPostImg);
    awardsPostImgDiv.appendChild(awardsPostImgUpload);

    awardsPostInputDiv.appendChild(awardsPostInputTitle);
    awardsPostInputDiv.appendChild(awardsPostInputPara);

    awardsPostImgDiv.setAttribute("style", "width: 50%; margin-right: 10px");
    awardsPostInputDiv.setAttribute("style", "width: 50%; margin-left: 10px;");

    awardsPostDiv.appendChild(awardsPostImgDiv);
    awardsPostDiv.appendChild(awardsPostInputDiv);

    document.getElementById("awards-edit-div").appendChild(awardsPostDiv);
  }
}
