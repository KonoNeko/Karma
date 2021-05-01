let changePasswordClick = true;
let changeUsernameClick = true;
let editInterfacePreferencesClick = true;

function changePassword() {
  // INPUTS
  let currentPasswordInput = document.createElement("input");
  currentPasswordInput.style.marginBottom = "12px";
  currentPasswordInput.id = "currentPasswordInput";

  let newPasswordInput = document.createElement("input");
  newPasswordInput.style.marginBottom = "12px";
  newPasswordInput.id = "newPasswordInput";

  let confirmPasswordInput = document.createElement("input");
  confirmPasswordInput.style.marginBottom = "12px";
  confirmPasswordInput.id = "confirmPasswordInput";

  // LABELS
  let currentPasswordLabel = document.createElement("label");
  currentPasswordLabel.style.marginBottom = "2px";
  currentPasswordLabel.style.marginTop = "8px";
  currentPasswordLabel.style.fontFamily = "Open Sans";
  currentPasswordLabel.innerHTML = "Current Password";

  let newPasswordLabel = document.createElement("label");
  newPasswordLabel.style.marginBottom = "2px";
  newPasswordLabel.style.fontFamily = "Open Sans";
  newPasswordLabel.innerHTML = "New Password";

  let confirmPasswordLabel = document.createElement("label");
  confirmPasswordLabel.style.marginBottom = "2px";
  confirmPasswordLabel.style.fontFamily = "Open Sans";
  confirmPasswordLabel.innerHTML = "Confirm Password";

  //BUTTON
  let changePasswordButton = document.createElement("button");
  changePasswordButton.innerHTML = "Change Password";

  let changePasswordSetting = document.getElementById(
    "change-password-setting"
  );

  if (changePasswordClick) {
    document.getElementById("change-password-heading").style.paddingBottom =
      "12px";

    changePasswordSetting.appendChild(currentPasswordLabel);
    changePasswordSetting.appendChild(currentPasswordInput);
    changePasswordSetting.appendChild(newPasswordLabel);
    changePasswordSetting.appendChild(newPasswordInput);
    changePasswordSetting.appendChild(confirmPasswordLabel);
    changePasswordSetting.appendChild(confirmPasswordInput);
    changePasswordSetting.appendChild(changePasswordButton);

    changePasswordClick = false;
  } else {
    while (changePasswordSetting.firstChild) {
      changePasswordSetting.removeChild(changePasswordSetting.firstChild);
    }

    let changePasswordHeading = document.createElement("span");
    changePasswordHeading.innerHTML = "Change Password";
    changePasswordHeading.style.fontWeight = "bold";

    changePasswordSetting.appendChild(changePasswordHeading);
    changePasswordClick = true;
  }
}

function changeUsername() {
  let firstClick = true;
}

function editInterfacePreferences() {
  let firstClick = true;
}
