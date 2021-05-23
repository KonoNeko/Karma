// function post() {

//   //alert("in post fun");
//   console.log("in post");
//   let caption = document.getElementById("inputCaption").value;
//   console.log(caption);
//   let user = firebase.auth().currentUser.uid;
  
//   db.collection("posts").add({
//       caption: caption,
//       user: user
//   })
//   .then(function(docRef) {
//       alert("success");
//       console.log("Success: " + docRef);
//   })
//   .catch(function(error) {
//       alert("Fail");
//       console.log("Error: " + error);
//       })
//   }


// function createPost() {
//     let posts = [];

//     const addPost = (ev) => {
//         ev.preventDefault();
//         let post = {
//             caption: document.getElementsByClassName('caption'),
//             location: document.getElementById('locaiton'),
//             tags: document.getElementById('tags')
//         }
//         posts.push(post);

//         console.warn('added', {posts});
//         let pre = document.querySelector('#msg pre');
//         pre.textContent = '\n' + JSON.stringify(posts, '\t', 2);
//     }
//     document.addEventListener('DOMContentLoaded', ()=>{
//         document.getElementById('postBtn').addEventListener('click', addPost);
//     })

//     console.log(posts);
// }