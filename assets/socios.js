// Initialize Firebase
var config = {
    apiKey: "AIzaSyBRrNpwc14FhpcVXutaKZIoa2XWXRYc4J4",
    authDomain: "urbantreeschedule.firebaseapp.com",
    databaseURL: "https://urbantreeschedule.firebaseio.com",
    projectId: "urbantreeschedule",
    storageBucket: "urbantreeschedule.appspot.com",
    messagingSenderId: "794911316272"
};
firebase.initializeApp(config);

var dataRef = firebase.database();



initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

     

      } else {
        // User is signed out.
        console.log("-- User Signed Out --");
        window.location.href='login.html';
        //document.getElementById('sign-in-status').textContent = 'Signed out';
        //document.getElementById('sign-in').textContent = 'Sign in';
        //document.getElementById('account-details').textContent = 'null';
      }
    }, function(error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function() {
    initApp()
  });


  dataRef.ref("/socias").on("child_added", function(childSnapshot, prevChildKey) {

    // Store everything into a variable.
    var nombreSocio = childSnapshot.val().nombreSocio;
    var emailSocio = childSnapshot.val().emailSocio;
    var finPaquete = childSnapshot.val().finPaquete;
    var inicioPaquete = childSnapshot.val().inicioPaquete;
    var numSesiones=childSnapshot.val().numSesiones;
    var numSocio=childSnapshot.val().numSocio;


  $("#tabla-socios").append("<tr><td>" + numSocio + "</td><td>" +nombreSocio + "</td><td>" +
  emailSocio + "</td><td>" + numSesiones + "</td><td>" + inicioPaquete + "</td><td>" + finPaquete + "</td></tr>");
});