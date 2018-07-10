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


var dataRef = firebase.database()
var emailSocio;
var nombreSocio;
var numSesiones;
var sesionesNuevas;
var inicioNuevo;
var finNuevo;

$("#buscaSocio").on("click", function (event) {
    event.preventDefault();
    emailSocio = $("#contactEmail").val().trim();
    //console.log("El email es " + emailSocio);
    var query = dataRef.ref("/socias").orderByChild("emailSocio").equalTo(emailSocio);
    query.once("value", function (snapshot) {
        if (snapshot.exists()) {
            //console.log(snapshot.val());
            snapshot.forEach(function (childSnapshot) {

                var key = childSnapshot.key;
                var childData = childSnapshot.val();

                //*Estos son los datos del socio

                sesionesDisponibles = childData.numSesiones;
                nombreSocio = childData.nombreSocio;
            });
            $("#busquedaSocio").text(nombreSocio + " tiene " + sesionesDisponibles + " sesiones disponibles y se le sumaran a su renovación");
            $("#renovacionSocio").prop("disabled", false)
        }
        else {
            //console.log("No existe");
            $("#busquedaSocio").text("El socio no esta dado de alta. Por favor dalo de alta como socio nuevo.")
        }
    })
})

$("#renovacionSocio").on("click", function (event) {
    event.preventDefault();
    sesionesNuevas = parseInt($("#numSesiones").val());
    inicioNuevo = $("#inicioPaquete").val();
    finNuevo = $("#finPaquete").val();
    sesionesNuevas = sesionesDisponibles + sesionesNuevas
    var query = dataRef.ref("/socias").orderByChild("emailSocio").equalTo(emailSocio);
    query.once("child_added", function (snapshot) {
        snapshot.ref.update({ numSesiones: sesionesNuevas })
        snapshot.ref.update({ inicioPaquete: inicioNuevo })
        snapshot.ref.update({ finPaquete: finNuevo })
    })
    $("#contactEmail").val("");
    $("#numSesiones").val("");
    $("#renovacionSocio").prop("disabled", true);
    $("#busquedaSocio").empty();
    $("#Respuesta").text("La renovación fue hecha con exito.")

})