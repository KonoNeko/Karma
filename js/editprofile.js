function showProfile(){

    firebase.auth().onAuthStateChanged(function (user) {
          
      db.collection("users").doc(user.uid)
      .get()
      .then(function(doc) {
          let user = doc.data();
          console.log(user.name);
          console.log(user.email);
          document.getElementById("name").innerHTML = user.name;
          document.getElementById("email").innerHTML = user.email;
      })
      
      .catch((error) => {
          console.log(`Error getting data: ${error}`);
      });
  });
  
  }
  document.getElementById("descbtn").onclick = function () {
    location.href = "adddescription.html";
};