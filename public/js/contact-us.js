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

let done_viewing = false;

const result = [
  {
    post_info: {
      post_id: 1,
      image_url:
        "https://www.citynews1130.com/wp-content/blogs.dir/sites/9/2019/04/21/church.jpg",
      caption:
        "This is the church I used to volunteer at, St. Mary's Parish! Always a blast with all the people I volunteer with.",
      location: "St. Mary's Parish",
      post_date: "2021-05-03T21:29:36.000Z",
      likes: 2,
      username: "marlon",
      profile_pic_url:
        "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png",
    },
    comments: {
      3: {
        comment_id: 3,
        post_id: 1,
        user_id: 1,
        comment: "Glad to see you active in your community!",
        is_a_reply: 0,
        id_of_comment_receiving_reply: null,
        comment_date: "2021-05-11T06:52:31.000Z",
        commenter_profile_pic:
          "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
        comment_poster: "Karma",
      },
      totalComments: 1,
    },
  },
  {
    post_info: {
      post_id: 2,
      image_url:
        "https://images.prismic.io/bcplace/4bb395e33a509c8e65e897a1b51988a6e739b072_vancouver_sun_run.jpg",
      caption:
        "Volunteering at the sun run was so fun! Can't wait until the day they are able to hold another!",
      location: "BC Place",
      post_date: "2021-05-04T01:06:34.000Z",
      likes: 1,
      username: "marlon",
      profile_pic_url:
        "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png",
    },
    comments: {
      10: {
        comment_id: 10,
        post_id: 2,
        user_id: 1,
        comment: "We miss the sun run :(",
        is_a_reply: 0,
        id_of_comment_receiving_reply: null,
        comment_date: "2021-05-13T05:23:39.000Z",
        commenter_profile_pic:
          "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
        comment_poster: "Karma",
        replies: {
          14: {
            comment_id: 14,
            post_id: 2,
            user_id: 1,
            comment: "Yeah same",
            is_a_reply: 1,
            id_of_comment_receiving_reply: 10,
            comment_date: "2021-05-13T06:07:11.000Z",
            commenter_profile_pic:
              "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png",
            comment_poster: "marlon",
          },
        },
      },
      totalComments: 2,
    },
  },
  {
    post_info: {
      post_id: 4,
      image_url:
        "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
      caption:
        "Welcome to Karma! Use our platform share your experiences with volunteering, find opportunites near you, or network with other community members!",
      location: "",
      post_date: "2021-05-04T02:58:03.000Z",
      likes: 1,
      username: "Karma",
      profile_pic_url:
        "https://raw.githubusercontent.com/KonoNeko/Karma/main/public/res/logo0_colored.png",
    },
    comments: {
      totalComments: 0,
    },
  },
];

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
