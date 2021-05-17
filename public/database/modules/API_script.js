const BASE_URL = "https://marlonfajardo.ca/karma/v1";



function editProfileSection(username, section, newData, method) {

  const profileSections = {
    "/education": {
      "ADD": "",
      "EDIT": "",
      "REMOVE": ""
    },
    "/experience": {
      "ADD": "",
      "EDIT": "",
      "REMOVE": ""
    },
    "/skills": {
      "ADD": "",
      "REMOVE": ""
    },
    "/awardsAndCertification": {
      "ADD": "",
      "EDIT": "",
      "REMOVE": ""
    },

  }
  console.log(method + ": " + BASE_URL + endpoint);

  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url + endpoint, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          document.getElementById("result").innerText = this.responseText;
      }
  }
}