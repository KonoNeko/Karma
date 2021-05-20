const BASE_URL = "https://marlonfajardo.ca/karma/v1";

function APIRequest(method, url) {
  console.log(method + ": " + url);
  const xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let result = JSON.parse(this.responseText);
      console.log("success editing profile");
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        loadProfile(result[i]);
      }
    }
  };
}

function addVolunteeringPost(id, category, date, title, desc, requires, img) {
  const method = "POST";
  const endpoint = "/opportunities";
  const params = formatParams({
    id: id,
    category: category,
    date: date,
    title: title,
    desc: desc,
    requires: requires,
    img: img,
  });
  const url = BASE_URL + endpoint + params;

  return APIRequest(method, url);
}
