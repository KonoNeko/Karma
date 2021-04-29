function generateVolunteerForm() {
  document.getElementById("partner-with-us-organization").style.display =
    "none";
  let form = document.getElementById("partner-with-us-volunteer");
  form.style.display = "unset";

  document.getElementById("volunteer-partner-btn").style.backgroundColor =
    "#49a1b9";
  document.getElementById("volunteer-partner-btn").style.boxShadow =
    "0 5px 15px rgba(73, 161, 165, 0.4)";

  document.getElementById("organization-partner-btn").style.backgroundColor =
    "#0367A6";
  document.getElementById("organization-partner-btn").style.boxShadow = "none";
}

function generateOrganizationForm() {
  document.getElementById("partner-with-us-volunteer").style.display = "none";
  let form = document.getElementById("partner-with-us-organization");
  form.style.display = "unset";

  document.getElementById("organization-partner-btn").style.backgroundColor =
    "#49a1b9";
  document.getElementById("organization-partner-btn").style.boxShadow =
    "0 5px 15px rgba(73, 161, 165, 0.4)";

  document.getElementById("volunteer-partner-btn").style.backgroundColor =
    "#0367A6";
  document.getElementById("volunteer-partner-btn").style.boxShadow = "none";
}
