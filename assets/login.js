// Initialize Firebase
var config = {
    apiKey: "AIzaSyBRrNpwc14FhpcVXutaKZIoa2XWXRYc4J4",
    authDomain: "urbantreeschedule.firebaseapp.com",
    databaseURL: "https://urbantreeschedule.firebaseio.com",
    projectId: "urbantreeschedule",
    storageBucket: "",
    messagingSenderId: "794911316272"
};
firebase.initializeApp(config);

// FirebaseUI config.
initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
window.location.href='index.html';


      } else {
          var uiConfig = {
signInSuccessUrl: 'index.html',
signInOptions: [
// Leave the lines as is for the providers you want to offer your users.
//firebase.auth.GoogleAuthProvider.PROVIDER_ID,
firebase.auth.EmailAuthProvider.PROVIDER_ID,

],
// Terms of service url.
tosUrl: '#'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#login-ui', uiConfig);
      }
    }, function(error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function() {
    initApp()
  });