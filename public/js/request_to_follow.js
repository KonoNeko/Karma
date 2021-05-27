function APIRequest(method, url, callback) {
    console.log(method + ": " + url);
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response;
        try {
          response = JSON.parse(this.responseText);
        } catch(err) {
          response = this.responseText;
        } finally {
          callback(response);
        }
      }
    };
  }

function formatParams(params) {
  let string = "?";
  let keys = Object.keys(params);
  for(let i=0; i<keys.length; i++) {
    string += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.length - 1) {
      string += "&";
    }
  }
  return string;
}

function request_follow(userID, follower) {
  const method = "POST";
  const endpoint = "/profiles/followers";
  const params = formatParams({
    "id": userID,
    "follower": follower,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, (res) => {
      console.log(res);
      window.location.reload();
    });
  }

function unfollow_user(userID, follower) {
  const method = "DELETE";
  const endpoint = "/profiles/followers";
  const params = formatParams({
    "id": userID,
    "follower": follower,
  });
  const url = BASE_URL + endpoint + params;

  APIRequest(method, url, (res) => {
    console.log(res);
    window.location.reload();
  });
}
  
  





