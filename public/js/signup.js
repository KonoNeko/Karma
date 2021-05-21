
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
  apiKey: "AIzaSyA5oEJUCOc3V4zgGI9-wwMWmd-P6opmnWI",
  authDomain: "karma-535f3.firebaseapp.com",
  databaseURL: "https://karma-535f3-default-rtdb.firebaseio.com",
  projectId: "karma-535f3",
  storageBucket: "karma-535f3.appspot.com",
  messagingSenderId: "1023587584355",
  appId: "1:1023587584355:web:89bb521723bf4afd58eb56",
  measurementId: "G-VTZ4TEWFBW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


  
const db = firebase.firestore();


$("#btn-login").click(function(){
  var email = $("#email").val();
  var password = $("#password").val();

  if (email != "" && password != "")
  {
    var result = firebase.auth().signInWithEmailAndPassword(email, password);

    result.catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      window.alert("Message: " + errorMessage);
    });

  }
  else
  {
    window.alert("Please fill out all fields.");    }

});

async function usernameExists() {
  const citiesRef = db.collection('users');
  const snapshot = await citiesRef.where('username', '==', $("#username").val()).get();
  if (snapshot.empty) {
    return false;
  } else {
    return true
  }
}

  
$("#btn-signup").click(function(){
  let email = $("#email").val();
  let password = $("#password").val();
  let cpassword = $("#confirmPassowrd").val();
  let full_name = $("#name").val();
  let username = $("#username").val();
  const btn = $("#btn-signup").val();

  


  if (email != "" && password != "" && cpassword != "" && full_name != "" && username != "") {
    usernameExists().then( // ensures usernames are unique
      (userExists) => {
        if (userExists) {
          alert("Unfortunately, that username is taken. Please choose another username.");
        } else {
          var result = firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
            db.collection('users').doc(cred.user.uid).set({
              email: email,
              fullName: full_name,
              username: username 
            });
          });
    
          result.catch(function(error){
    
            var errorCode = error.code;
            var errorMessage = error.message;
    
            console.log(errorCode);
            window.alert("Message: " + errorMessage);
    

          });
        }
      },
      (error) => {console.log(error);}
    );
    setInterval(() => {
      usernameExists().then(
        (userExists) => {
          firebase.auth().onAuthStateChanged(function (user) {
            if(user && userExists) { 
              window.location.href = "home.html"; 
            }
          });
        },
        (error) => {console.log(error);}
      );
    }, 1000);
  } else {
    window.alert("Please fill out all fields.");    
  }
});

  

  

