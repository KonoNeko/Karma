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
  changePasswordButton.setAttribute("onclick", "savePassword()");

  // CHANGE PASSWORD DIV
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
    changePasswordHeading.setAttribute("onclick", "changePassword()");
    changePasswordHeading.setAttribute("id", "change-password-heading");

    changePasswordSetting.appendChild(changePasswordHeading);
    changePasswordClick = true;
  }
}

function changeUsername() {
  // LABEL
  let usernameLabel = document.createElement("label");
  usernameLabel.style.marginBottom = "2px";
  usernameLabel.style.marginTop = "8px";
  usernameLabel.style.fontFamily = "Open Sans";
  usernameLabel.innerHTML = "Username";

  // INPUT
  let usernameInput = document.createElement("input");
  usernameInput.style.marginBottom = "12px";
  usernameInput.id = "usernameInput";

  // BUTTON
  let changeUsernameButton = document.createElement("button");
  changeUsernameButton.innerHTML = "Change Username";
  changeUsernameButton.setAttribute("onclick", "saveUsername()");

  // CHANGE USERNAME DIV
  let changeUsernameSetting = document.getElementById(
    "change-username-setting"
  );

  if (changeUsernameClick) {
    document.getElementById("change-username-heading").style.paddingBottom =
      "12px";

    changeUsernameSetting.appendChild(usernameLabel);
    changeUsernameSetting.appendChild(usernameInput);
    changeUsernameSetting.appendChild(changeUsernameButton);

    changeUsernameClick = false;
  } else {
    while (changeUsernameSetting.firstChild) {
      changeUsernameSetting.removeChild(changeUsernameSetting.firstChild);
    }

    let changeUsernameHeading = document.createElement("span");
    changeUsernameHeading.innerHTML = "Change Username";
    changeUsernameHeading.style.fontWeight = "bold";
    changeUsernameHeading.setAttribute("id", "change-username-heading");
    changeUsernameHeading.setAttribute("onclick", "changeUsername()");

    changeUsernameSetting.appendChild(changeUsernameHeading);
    changeUsernameClick = true;
  }
}

function editInterfacePreferences() {
  // LABEL
  let editInterfacePreferenceLabel = document.createElement("label");
  editInterfacePreferenceLabel.for = "edit-interface-select";
  editInterfacePreferenceLabel.style.marginBottom = "2px";
  editInterfacePreferenceLabel.style.marginTop = "8px";
  editInterfacePreferenceLabel.style.fontFamily = "Open Sans";
  editInterfacePreferenceLabel.innerHTML = "Dark mode";

  // SELECT
  let editInterfacePreferenceSelect = document.createElement("select");
  editInterfacePreferenceSelect.name = "edit-interface-select";
  editInterfacePreferenceLabel.id = "edit-interface-select";

  // OPTION
  let optionLightMode = document.createElement("option");
  optionLightMode.value = "lightMode";
  optionLightMode.innerHTML = "Light";

  let optionDarkMode = document.createElement("option");
  optionDarkMode.value = "darkMode";
  optionDarkMode.innerHTML = "Dark";

  editInterfacePreferenceSelect.appendChild(optionLightMode);
  editInterfacePreferenceSelect.appendChild(optionDarkMode);

  // BUTTON
  let editInterfacePreferencesButton = document.createElement("button");
  editInterfacePreferencesButton.innerHTML = "Save Preferences";
  editInterfacePreferencesButton.setAttribute("onclick", "savePreferences()");

  // EDIT INTERFACE PREFERENCES DIV
  let editInterfacePreferencesSetting = document.getElementById(
    "edit-interface-preferences-setting"
  );

  if (editInterfacePreferencesClick) {
    document.getElementById(
      "edit-interface-preferences-setting"
    ).style.paddingBottom = "12px";

    editInterfacePreferencesSetting.appendChild(editInterfacePreferenceLabel);
    editInterfacePreferencesSetting.appendChild(editInterfacePreferenceSelect);
    editInterfacePreferencesSetting.appendChild(editInterfacePreferencesButton);

    editInterfacePreferencesClick = false;
  } else {
    while (editInterfacePreferencesSetting.firstChild) {
      editInterfacePreferencesSetting.removeChild(
        editInterfacePreferencesSetting.firstChild
      );
    }

    let editInterfacePreferencesHeading = document.createElement("span");
    editInterfacePreferencesHeading.innerHTML = "Edit Interface Preferences";
    editInterfacePreferencesHeading.style.fontWeight = "bold";
    editInterfacePreferencesHeading.setAttribute(
      "id",
      "edit-interface-preferences-heading"
    );
    editInterfacePreferencesHeading.setAttribute(
      "onclick",
      "editInterfacePreferences()"
    );

    editInterfacePreferencesSetting.appendChild(
      editInterfacePreferencesHeading
    );
    editInterfacePreferencesClick = true;
  }
}

function savePassword() {
  // CHANGE PASSWORD DIV
  let changePasswordSetting = document.getElementById(
    "change-password-setting"
  );

  let savePasswordMessage = document.createElement("div");
  savePasswordMessage.innerHTML = "Your password has been saved.";
  savePasswordMessage.style.paddingTop = "12px";
  savePasswordMessage.style.fontFamily = "Open Sans";
  savePasswordMessage.style.color = "#51B09F";

  changePasswordSetting.appendChild(savePasswordMessage);
}

function saveUsername() {
  // CHANGE USERNAME DIV
  let changeUsernameSetting = document.getElementById(
    "change-username-setting"
  );

  let saveUsernameMessage = document.createElement("div");
  saveUsernameMessage.innerHTML = "Your username has been saved.";
  saveUsernameMessage.style.paddingTop = "12px";
  saveUsernameMessage.style.fontFamily = "Open Sans";
  saveUsernameMessage.style.color = "#51B09F";

  changeUsernameSetting.appendChild(saveUsernameMessage);
}

function savePreferences() {
  // EDIT INTERFACE PREFERENCES DIV
  let editInterfacePreferencesSetting = document.getElementById(
    "edit-interface-preferences-setting"
  );

  let editInterfacePreferencesMessage = document.createElement("div");
  editInterfacePreferencesMessage.innerHTML =
    "Your preferences have been saved.";
  editInterfacePreferencesMessage.style.paddingTop = "12px";
  editInterfacePreferencesMessage.style.fontFamily = "Open Sans";
  editInterfacePreferencesMessage.style.color = "#51B09F";

  editInterfacePreferencesSetting.appendChild(editInterfacePreferencesMessage);
}
