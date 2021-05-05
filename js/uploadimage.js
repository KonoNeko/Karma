function post() {

    //alert("in post fun");
    console.log("in post");
    let caption = document.getElementById("inputCaption").value;
    console.log(caption);
    let user = firebase.auth().currentUser.uid;
    
    db.collection("posts").add({
        caption: caption,
        user: user
    })
    .then(function(docRef) {
        alert("success");
        console.log("Success: " + docRef);
    })
    .catch(function(error) {
        alert("Fail");
        console.log("Error: " + error);
        })
    }