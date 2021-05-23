const BASE_URL = "https://marlonfajardo.ca/karma/v1";



function APIRequest(method, url, callback) {
    console.log(method + ": " + url);
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText;
        try {
          response = JSON.parse(response);
        } finally {
          callback(response);
        }
      }
    };
  }



function request_follow(userID, follower) {
  const method = "POST";
  const endpoint = "/profiles/followers";
  const params = formatParams({
    "id": userID,
    "follower": follower,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, console.log);
}
  





