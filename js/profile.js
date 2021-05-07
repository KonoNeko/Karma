
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
  function showImages() {
    
    var storage = firebase.storage();
    var storageRef  = storage.ref();
    
    $('#List').find('tbody').html('');
    
    var i =0;
    
    storageRef.child('images/').listAll().then(function(result){
     result.items.forEach(function(imageRef){
    
       i++
       displayImage(i, imageRef);
     
     });
    });
    function displayImage(row, images){
    images.getDownloadURL().then(function(url){
    console.log(url);
    
    let new_html = '';
    new_html += '<tr>';
    new_html += '<td>';
    new_html += row;
    new_html += '</td>';
    new_html += '<td>';
    new_html += '<img src= " '+url+' " width="100px" style= "float:right">';
    new_html += '</td>';
    new_html += '</tr>';
    // $('#List').find('tbody').append(new_html);
    
    
    let myImg = `
    <div><br>
      <img src="${url}" width="90%" height="90%"><br>
      <button id="like">Like</button>
      <br>
    </div>
    `;
    
    $('#postDiv').append(myImg);
    
    });
    }
    }
    
    



