var firebaseConfig = {
  apiKey: "AIzaSyA5oEJUCOc3V4zgGI9-wwMWmd-P6opmnWI",
  authDomain: "karma-535f3.firebaseapp.com",
  databaseURL: "https://karma-535f3-default-rtdb.firebaseio.com/",
  projectId: "karma-535f3",
  storageBucket: "karma-535f3.appspot.com",
  messagingSenderId: "1023587584355",
  appId: "1:1023587584355:web:89bb521723bf4afd58eb56",
  measurementId: "G-VTZ4TEWFBW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const BASE_URL = "https://marlonfajardo.ca/karma/v1";

let info = {};
let username;
get_firebase_info();

async function get_firebase_info() {
  firebase.auth().onAuthStateChanged(function (user) {
    return db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let user = doc.data();
        console.log(user);
        info.fullName = user.fullName;
        username = user.username;
        info.email = user.email;
        info.username = user.username;
        loadWhatsNew();
        loadRecommendedConnections(info.username);
      })
      .catch((error) => {
        console.log(`Error getting data: ${error}`);
      });
  });
}
