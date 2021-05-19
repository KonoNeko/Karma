
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

 


// const txtEmail = document.getElementById("email");
// const textPassword = document.getElementById("password");
// const login = document.getElementById("btn-login");
// const signup = document.getElementById("btn-signup");
// const logout = document.getElementById("btn-logout");

// login.addEventListener("click", e => {
//   const email = txtEmail.value;
//   const pass = textPassword.value;
//   const auth = firebase.auth();

//   //Sign in

//   const promise = auth.signInWithEmailAndPassword(email, pass);
//   promise.catch (e => console.log (e.message));

// });

// signup.addEventListener("click", e => {
//   const email = txtEmail.value;
//   const pass = textPassword.value;
//   const auth = firebase.auth();

//   //Sign in

//   const promise = auth.createUserWithEmailAndPassword(email, pass);
//   promise.catch (e => console.log (e.message));

// });


// logout.addEventListener("click", e => {
//   firebase.auth().signOut();
// })






// firebase.auth().onAuthStateChanged(firebaseUser => {
// if(firebaseUser) {
//   console.log(firebaseUser);
// }
// });



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



  
  $("#btn-signup").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmPassowrd").val();
    const btn = $("#btn-signup").val();


    if (email != "" && password != "" && cpassword != "")
    {
      var result = firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
        return  db.collection('user').doc(cred.user.uid).set({
          name: $("#name").val(),
        })
      });

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

  

  

