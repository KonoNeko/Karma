function loadOpportunities() {
  loadRecommendedOpportunities();
  loadFineArtsOpportunities();
  loadSportsOpportunities();
  loadLiteracyOpportunities();
  loadEnvironmentOpportunities();
  loadHealthOpportunities();
  loadComputersOpportunities();
}

function loadRecommendedOpportunities() {
  let category = document.getElementById("recommended-opportunities");
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
}

function loadFineArtsOpportunities() {
  let category = document.getElementById("fine-arts-opportunities");
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
}

function loadSportsOpportunities() {
  let category = document.getElementById("sports-opportunities");
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
}

function loadLiteracyOpportunities() {
  let category = document.getElementById("literacy-opportunities");
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
}

function loadEnvironmentOpportunities() {
  let category = document.getElementById("environment-opportunities");
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
}

function loadHealthOpportunities() {
  let category = document.getElementById("health-opportunities");
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
}

function loadComputersOpportunities() {
  let category = document.getElementById("computers-opportunities");
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
  generateOpportunity(category);
}

function generateOpportunity(category) {
  let opportunityRole = document.createElement("p");
  opportunityRole.innerHTML = "opportunityRole Role Role";
  opportunityRole.setAttribute("class", "heading3");
  opportunityRole.setAttribute("font-weight", "bold");

  let opportunityImgDiv = document.createElement("div");
  opportunityImgDiv.setAttribute("class", "bulletinboardpicture");
  opportunityImgDiv.setAttribute("style", "padding-bottom: 10px");

  let opportunityImg = document.createElement("img");
  opportunityImg.src = "./images/placeholder.jpg";
  opportunityImgDiv.appendChild(opportunityImg);

  let opportunityLocation = document.createElement("p");
  opportunityLocation.innerHTML = "opportunityLocation";
  opportunityLocation.setAttribute("class", "bodytext");

  let opportunityDiv = document.createElement("div");
  opportunityDiv.setAttribute("class", "opportunity");
  opportunityDiv.appendChild(opportunityImgDiv);
  opportunityDiv.appendChild(opportunityRole);
  opportunityDiv.appendChild(opportunityLocation);

  category.appendChild(opportunityDiv);
}
