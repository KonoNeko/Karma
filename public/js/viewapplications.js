function addApplication() {
  let application = document.getElementById("viewapplicationsmodal-content");
  createApplication(application);
}

function createApplication(application) {
  let hr = document.createElement("hr");
  hr.setAttribute("style", "margin-top: 10px; margin-bottom: 10px");

  let applicationDiv = document.createElement("div");
  applicationDiv.setAttribute("class", "applicationDiv");

  let applicationImgDiv = document.createElement("div");
  applicationImgDiv.setAttribute(
    "class",
    "postpreviewpicture applicationImgDiv applicationDivColumn"
  );
  let applicationImg = document.createElement("img");
  applicationImg.src = "./images/placeholder.jpg";

  let applicationDetailsDiv = document.createElement("div");
  applicationDetailsDiv.setAttribute(
    "class",
    "applicationDivColumn applicationDetailsDiv"
  );
  let applicationDetailsRole = document.createElement("p");
  let applicationDetailsLocation = document.createElement("p");

  let applicationStatusDiv = document.createElement("div");
  applicationStatusDiv.setAttribute(
    "class",
    "applicationDivColumn applicationStatusDiv"
  );
  let applicationStatus = document.createElement("p");

  applicationDetailsRole.setAttribute("class", "heading2");
  applicationDetailsLocation.setAttribute("class", "heading3");
  applicationStatus.setAttribute("class", "heading3");
  applicationStatus.setAttribute("style", "font-weight: bold");

  applicationDetailsRole.innerHTML = "Library Tutor";
  applicationDetailsLocation.innerHTML = "Skyway Avenue Library";
  applicationStatus.innerHTML = "Pending";

  applicationImgDiv.appendChild(applicationImg);

  applicationDetailsDiv.appendChild(applicationDetailsRole);
  applicationDetailsDiv.appendChild(applicationDetailsLocation);

  applicationStatusDiv.appendChild(applicationStatus);

  applicationDiv.appendChild(applicationImgDiv);
  applicationDiv.appendChild(applicationDetailsDiv);
  applicationDiv.appendChild(applicationStatusDiv);

  application.appendChild(hr);
  application.appendChild(applicationDiv);
}
