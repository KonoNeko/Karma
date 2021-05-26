function logout() {
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      location.href = 'index.html';
    }).catch(function(error) {
      // An error happened.
    });
}