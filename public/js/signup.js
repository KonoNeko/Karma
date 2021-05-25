function formatParams(params) {
  let string = "?";
  let keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    string += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.length - 1) {
      string += "&";
    }
  }
  return string;
}

async function createNewProfile(username, full_name, isVolunteer) {
  let method = "POST"; // CHANGE TO POST
  let endpoint = "/profiles";
  const params = formatParams({
    id: username,
    name: full_name,
    isVolunteer: isVolunteer,
  });
  const url = BASE_URL + endpoint + params;
  return await APIRequest(method, url);
}

$("#btn-login").click(function () {
  var email = $("#email").val();
  var password = $("#password").val();

  if (email != "" && password != "") {
    var result = firebase.auth().signInWithEmailAndPassword(email, password);

    result.catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      window.alert("Message: " + errorMessage);
    });
  } else {
    window.alert("Please fill out all fields.");
  }
});

async function usernameExists() {
  const citiesRef = db.collection("users");
  const snapshot = await citiesRef
    .where("username", "==", $("#username").val())
    .get();
  if (snapshot.empty) {
    return false;
  } else {
    return true;
  }
}

$("#btn-signup").click(function () {
  let email = $("#email").val();
  let password = $("#password").val();
  let cpassword = $("#confirmPassowrd").val();
  let full_name = $("#name").val();
  let username = $("#username").val();
  let isVolunteer = $('input[name="isVolunteer"]:checked').val();

  if (
    email != "" &&
    password != "" &&
    cpassword != "" &&
    full_name != "" &&
    username != "" &&
    isVolunteer
  ) {
    usernameExists().then(
      // ensures usernames are unique
      (userExists) => {
        if (userExists) {
          alert(
            "Unfortunately, that username is taken. Please choose another username."
          );
        } else {
          var result = firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((cred) => {
              db.collection("users").doc(cred.user.uid).set({
                email: email,
                fullName: full_name,
                username: username,
                isVolunteer: isVolunteer,
              });
            });

          result.catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            window.alert("Message: " + errorMessage);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    let profileMade = false;
    createNewProfile(username, full_name, parseInt(isVolunteer)).then(
      (response) => {
        console.log(response);
        profileMade = true;
      },
      (error) => {
        console.log(error);
      }
    );
    setInterval(() => {
      usernameExists().then(
        (userExists) => {
          firebase.auth().onAuthStateChanged(function (user) {
            if (user && userExists && profileMade) {
              window.location.href = "home.html";
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }, 1000);
  } else {
    alert(isVolunteer);
    window.alert("Please fill out all fields.");
  }
});

$("#btn-logout").click(function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      alert("sign out success");
      location.href = "sign-up.html";
    })
    .catch(function (error) {
      // An error happened.
    });
});

//
// const logout = document.querySelector("#logout");
// logout.addEventListener("click", (e) =>{
//   e.preventDefault();
//   firebase.auth.signOut().then(()=>{
//     alert("user sign out")
//
//   })
// })
