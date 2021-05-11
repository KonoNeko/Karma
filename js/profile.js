function showProfile() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        console.log(user.name);
        console.log(user.email);
        document.getElementById("name").innerHTML = user.name;
        document.getElementById("email").innerHTML = user.email;
      })

      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
}

function showImages() {
  var storage = firebase.storage();
  var storageRef = storage.ref();

  $("#List").find("tbody").html("");

  var i = 0;

  storageRef
    .child("images/" + "profilePicture/")
    .listAll()
    .then(function (result) {
      result.items.forEach(function (imageRef) {
        i++;
        displayImage(i, imageRef);
      });
    });
  function displayImage(row, images) {
    images.getDownloadURL().then(function (url) {
      console.log(url);

      let new_html = "";
      new_html += "<tr>";
      new_html += "<td>";
      new_html += row;
      new_html += "</td>";
      new_html += "<td>";
      new_html +=
        '<img src= " ' + url + ' " width="100px" style= "float:right">';
      new_html += "</td>";
      new_html += "</tr>";
      // $('#List').find('tbody').append(new_html);

      let myImg = `
    <div><br>
      <img src="${url}" width="90%" height="90%"><br>
      <button id="like">Like</button>
      <br>
    </div>
    `;

      $("#postDiv").append(myImg);
    });
  }
}

function addSkills() {
  console.log("Add skills button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addSkillsHeading = document.createElement("p");
  addSkillsHeading.setAttribute("class", "heading3");
  addSkillsHeading.innerHTML = "Add skills";
  addSkillsHeading.setAttribute("style", "text-align: left");

  let addSkillsInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addSkillsHeading);
  document.getElementById("button-content").appendChild(addSkillsInput);
}

function addEducation() {
  console.log("Add education button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addEducationHeading = document.createElement("p");
  addEducationHeading.setAttribute("class", "heading3");
  addEducationHeading.innerHTML = "Add education";
  addEducationHeading.setAttribute("style", "text-align: left");

  let addEducationInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addEducationHeading);
  document.getElementById("button-content").appendChild(addEducationInput);
}

function addExperience() {
  console.log("Add experience button clicked");

  document.getElementById("button-content").innerHTML = "";

  let addExperienceHeading = document.createElement("p");
  addExperienceHeading.setAttribute("class", "heading3");
  addExperienceHeading.innerHTML = "Add experience";
  addExperienceHeading.setAttribute("style", "text-align: left");

  let addExperienceInput = document.createElement("textarea");

  document.getElementById("button-content").appendChild(addExperienceHeading);
  document.getElementById("button-content").appendChild(addExperienceInput);
}
