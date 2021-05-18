const BASE_URL = "https://marlonfajardo.ca/karma/v1";


function editProfileSection(method, section, newData) {
  // const profileSections = {
  //   "/education": {
  //     "POST": [""],
  //     "PUT": [],
  //     "DELETE": []
  //   },
  //   "/experience": {
  //     "POST": [],
  //     "PUT": [],
  //     "DELETE": []
  //   },
  //   "/skills": {
  //     "PUT": [],
  //     "DELETE": []
  //   },
  //   "/awardsAndCertification": {
  //     "POST": [],
  //     "PUT": [],
  //     "DELETE": []
  //   },

  // }

  let params = formatParams(newData);
  let url = BASE_URL + section + params;

  return APIRequest(method, url);
}

function createNewProfile(userID, fullname, isVolunteer) {
  const method = "POST";
  const endpoint = "/profiles";
  const params = formatParams({
    "id": userID,
    "name": fullname,
    "isVolunteer": isVolunteer
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}


export function view_social_feed(userID) {
  const method = "GET";
  const endpoint = "/posts";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;const BASE_URL = "https://marlonfajardo.ca/karma/v1";


function editProfileSection(method, section, newData) {
  // const profileSections = {
  //   "/education": {
  //     "POST": [""],
  //     "PUT": [],
  //     "DELETE": []
  //   },
  //   "/experience": {
  //     "POST": [],
  //     "PUT": [],
  //     "DELETE": []
  //   },
  //   "/skills": {
  //     "PUT": [],
  //     "DELETE": []
  //   },
  //   "/awardsAndCertification": {
  //     "POST": [],
  //     "PUT": [],
  //     "DELETE": []
  //   },

  // }

  let params = formatParams(newData);
  let url = BASE_URL + section + params;

  return APIRequest(method, url);
}

function createNewProfile(userID, fullname, isVolunteer) {
  const method = "POST";
  const endpoint = "/profiles";
  const params = formatParams({
    "id": userID,
    "name": fullname,
    "isVolunteer": isVolunteer
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}


function view_social_feed(userID) {
  const method = "GET";
  const endpoint = "/posts";
  const params = `/${userID}`;
  const url = BASE_URL + endpoint + params;
  let result = APIRequest(method, url);
    setTimeout(5000, function() {return result});
}

function view_opportunities() {
  const method = "GET";
  const endpoint = "/opportunities";
  const params = ``;
  const url = BASE_URL + endpoint + params;
  let result = APIRequest(method, url);
    setTimeout(5000, function() {return result});
}


function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          let result = JSON.parse(this.responseText);
          console.log(result);
          return result;
      }
  }
}


function formatParams(params) {
  let string = "?";
  let keys = Object.keys(params);
  for(let i=0; i<keys.length; i++) {
    string += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.legnth - 1) {
      string += "&";
    }
  }
  return string;
}
  let result = APIRequest(method, url);
  while(true) {
    if (result) {
      return result;
    }
  }
}


function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          let result = JSON.parse(this.responseText);
          console.log(result);
          return result;
      }
  }
}


function formatParams(params) {
  let string = "?";
  let keys = Object.keys(params);
  for(let i=0; i<keys.length; i++) {
    string += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.legnth - 1) {
      string += "&";
    }
  }
  return string;
}

function formatTimestamp(timestamp) {
  let dateObj = new Date(Date.parse(timestamp));
  return returnHighestTimeDiff(dateObj);
}

function returnHighestTimeDiff(time) {
  let ms = {
    y: 31536000000,
    w: 604800000,
    d: 86400000,
    h: 3600000,
    m: 60000,
  }
  let diff = Date.now() - time;
  for(let [key, value] of Object.entries(ms)) {
      if (diff > value) {
          return `${Math.floor(diff/value)}${key}`;
      } else if (diff < ms.m) {
        return "Just now";
      }
  }
}