// window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             var img = document.querySelector('img');
//             img.onload = () => {
//                 URL.revokeObjectURL(img.src);  
//             }
  
//             img.src = URL.createObjectURL(this.files[0]); 
//         }
//     });
//   });


let posts = [];

const addPost = (ev)=> {
  ev.preventDefault(); // stop the form from submitting
  let post = {
    caption: document.getElementById('caption').value,
    location: document.getElementById('location').value,
    tags: document.getElementById('tag').value
  }
  posts.push(post);
  document.forms[0].reset(); // clear form

  console.warn('added', {posts});
  let pre = document.querySelector('#msg pre');
  pre.textContent = '\n' + JSON.stringify(posts, '\t', 2);
}

document.addEventListener('DOMContentLoaded', ()=> {
  document.getElementById('post').addEventListener('click', addPost);
})





// const realFileBtn = document.getElementById("real-file");
// const customBtn = document.getElementById("custom-button");
// const customTxt = document.getElementById("custom-text");

// customBtn.addEventListener("click", function() {
//   realFileBtn.click();
// });

// realFileBtn.addEventListener("change", function() {
//   if (realFileBtn.value) {
//     customTxt.innerHTML = realFileBtn.value.match(
//       /[\/\\]([\w\d\s\.\-\(\)]+)$/
//     )[1];
//   } else {
//     customTxt.innerHTML = "No file chosen, yet.";
//   }
// });
