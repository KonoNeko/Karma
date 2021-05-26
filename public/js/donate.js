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
  
  let info = {};
  get_firebase_info();
  
  function get_firebase_info() {
    let info = {};
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          let user = doc.data();
          info['fullName'] = user.fullName;
          info['email'] = user.email;
          info['username'] = user.username; 
          view_notifications(info.username);
          loadRecommendedConnections(info.username);
          loadWhatsNew();
        })
        .catch((error) => {
          console.log(`Error getting data: ${error}`);
        });
    });
  }